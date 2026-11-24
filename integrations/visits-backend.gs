/**
 * MBUMAH HARDWARE - VISITOR COUNTER BACKEND
 * =========================================
 * A tiny, free, server-side visit counter for the static website.
 * It runs on Google Apps Script (free with any Google account, the same
 * account the yard inbox uses) and stores counts in a Google Sheet that is
 * created automatically on first use. No servers, no databases, no keys in
 * the website code.
 *
 * WHAT IT COUNTS (server side, so refreshes and repeat tabs are accurate)
 *   views    - every POST the site sends (page loads)
 *   visits   - one per browsing session (sessionStorage id; reloads in the
 *              same session are not counted again)
 *   visitors - one per device/browser (localStorage id; first-time only)
 *
 * PRIVACY
 *   The site sends only two random ids and the page path. No IP addresses,
 *   no user agents, no cookies, no personal data ever reach this script.
 *
 * ONE-TIME INSTALL (about 5 minutes)
 *   1. Go to https://script.google.com (sign in with the yard Google account).
 *   2. New project. Delete the placeholder code, paste this whole file.
 *   3. Save, then Deploy > New deployment > type: Web app.
 *        Description:      visitor counter
 *        Execute as:       Me
 *        Who has access:   Anyone
 *   4. Click Deploy, approve the permissions (Google shows one consent screen:
 *      "this app isn't verified" > Advanced > Go to project; it is your own script).
 *   5. Copy the Web app URL, it ends in /exec.
 *   6. Open index.html, paste that URL between the quotes of
 *      var VISITS_ENDPOINT = "";
 *      Commit and deploy the site as usual. The footer chip appears on the
 *      next visit and the counts live in a sheet named
 *      "Mbumah Hardware - Site Visits" in your Google Drive.
 *
 * MAINTENANCE
 *   - Numbers: open the sheet, Stats tab (views / visits / visitors rows).
 *   - Reset:   clear the Stats B column and empty the Visitors + Sessions tabs.
 *   - Retire:  set VISITS_ENDPOINT back to "" and delete the deployment;
 *              the site hides the chip and keeps working as before.
 *   - Upgrade: if traffic grows past ~50k visitors, move the endpoint to a
 *              real database backend and keep the same JSON contract:
 *              POST {vid, sid, page} -> {views, visits, visitors}
 *
 * NOTES FOR EDITORS
 *   - Apps Script supports simple CORS requests only when the body is sent as
 *     text/plain; the site already does exactly that, so do not add custom
 *     request headers on the client.
 *   - LockService keeps simultaneous visitors from overwriting each other's
 *     increments.
 *   - Re-deploying code changes: Deploy > Manage deployments > edit > new
 *     version, so the /exec URL stays the same.
 */

var DOC_TITLE = "Mbumah Hardware - Site Visits";

function getSpreadsheet_() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty("VISITS_SHEET_ID");
  if (id) {
    try { return SpreadsheetApp.openById(id); } catch (e) { /* recreate below */ }
  }
  var ss = SpreadsheetApp.create(DOC_TITLE);
  props.setProperty("VISITS_SHEET_ID", ss.getId());
  var seed = ss.getSheetByName("Sheet1");
  if (seed && ss.getSheets().length > 1) ss.deleteSheet(seed);
  return ss;
}

function sheet_(ss, name) {
  var sh = ss.getSheetByName(name);
  if (!sh) sh = ss.insertSheet(name);
  return sh;
}

function statRow_(sh, key) {
  var last = Math.max(sh.getLastRow(), 1);
  var found = sh.getRange(1, 1, last, 1).createTextFinder(key).matchEntireCell(true).findFirst();
  return found ? found.getRow() : 0;
}

function getStat_(sh, key) {
  var row = statRow_(sh, key);
  return row ? Number(sh.getRange(row, 2).getValue()) || 0 : 0;
}

function bumpStat_(sh, key, by) {
  var row = statRow_(sh, key);
  var value = (row ? Number(sh.getRange(row, 2).getValue()) || 0 : 0) + by;
  if (row) sh.getRange(row, 2).setValue(value);
  else sh.appendRow([key, value]);
  return value;
}

function seen_(sh, value) {
  if (!sh.getLastRow()) return false;
  return sh.getRange(1, 1, sh.getLastRow(), 1)
    .createTextFinder(value).matchEntireCell(true).findFirst() !== null;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/* POST handler: the website sends {vid, sid, page} on every page load */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var body = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    var vid = String(body.vid || "").slice(0, 64);
    var sid = String(body.sid || "").slice(0, 64);
    if (!vid || !sid) return json_({ error: "vid and sid are required" });

    var ss = getSpreadsheet_();
    var stats = sheet_(ss, "Stats");
    var sessions = sheet_(ss, "Sessions");
    var visitors = sheet_(ss, "Visitors");

    var views = bumpStat_(stats, "views", 1);

    var visits;
    if (seen_(sessions, sid)) {
      visits = getStat_(stats, "visits");
    } else {
      sessions.appendRow([sid, new Date()]);
      visits = bumpStat_(stats, "visits", 1);
    }

    var visitorsCount;
    if (seen_(visitors, vid)) {
      visitorsCount = getStat_(stats, "visitors");
    } else {
      visitors.appendRow([vid, new Date()]);
      visitorsCount = bumpStat_(stats, "visitors", 1);
    }

    return json_({ views: views, visits: visits, visitors: visitorsCount });
  } catch (err) {
    return json_({ error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/* GET handler: read the totals without counting anything (for a dashboard check) */
function doGet() {
  try {
    var props = PropertiesService.getScriptProperties();
    var id = props.getProperty("VISITS_SHEET_ID");
    if (!id) return json_({ views: 0, visits: 0, visitors: 0 });
    var stats = sheet_(SpreadsheetApp.openById(id), "Stats");
    return json_({
      views: getStat_(stats, "views"),
      visits: getStat_(stats, "visits"),
      visitors: getStat_(stats, "visitors")
    });
  } catch (err) {
    return json_({ error: String(err) });
  }
}
