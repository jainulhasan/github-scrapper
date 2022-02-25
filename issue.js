const request = require("request")
const cheerio = require("cheerio")
const fs = require("fs");
const path = require("path");
const pdfkit = require("pdfkit")

function getIssuesPageHtml(url, topic, repoName) {
    request(url, cb);

    function cb(err, response, html) {
        if (err) {
            console.log(err);
        } else {
            // console.log(html);
            getIssues(html)
        }
    }

    function getIssues(html) {
        let $ = cheerio.load(html);
        let issuesElem = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title")
        let arr = []
        for (let i = 0; i < issuesElem.length; i++) {
            let link = $(issuesElem[i]).attr("href");
            // console.log(link);
            arr.push(link);
        }
        // console.log(topic, "     ", arr);
        let folderPath = path.join(__dirname, topic);
        dirCreater(folderPath)
        let filePath = path.join(folderPath, repoName + ".pdf")
        let text = JSON.stringify(arr);
        let pdfDoc = new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.text(text);
        pdfDoc.end();
        // fs.writeFileSync(filePath, )
    }

}

module.exports = getIssuesPageHtml;

function dirCreater(folderPath) {
    if (fs.existsSync(folderPath) == false) {
        fs.mkdirSync(folderPath)
    }
}