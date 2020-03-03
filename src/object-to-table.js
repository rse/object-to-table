/*
**  Object-to-Table -- Format Object as HTML Table
**  Copyright (c) 2020 Dr. Ralf S. Engelschall <rse@engelschall.com>
**
**  Permission is hereby granted, free of charge, to any person obtaining
**  a copy of this software and associated documentation files (the
**  "Software"), to deal in the Software without restriction, including
**  without limitation the rights to use, copy, modify, merge, publish,
**  distribute, sublicense, and/or sell copies of the Software, and to
**  permit persons to whom the Software is furnished to do so, subject to
**  the following conditions:
**
**  The above copyright notice and this permission notice shall be included
**  in all copies or substantial portions of the Software.
**
**  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
**  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
**  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
**  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
**  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
**  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
**  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/*  the API function  */
const objectToTable = (object, options = {}) => {
    /*  determine options  */
    options = Object.assign({}, {
        tableBegin: ()      => "<table>",
        tableEnd:   ()      => "</table>",
        rowBegin:   ()      => "<tr>",
        rowEnd:     ()      => "</tr>",
        colBegin:   (isKey) => isKey ? "<td class=\"key\">" : "<td class=\"val\">",
        colEnd:     (isKey) => "</td>"
    }, options)

    /*  recursively format object  */
    const format = (object) => {
        let html = ""
        if (typeof object === "object" && object instanceof Array) {
            html = options.tableBegin()
            object.forEach((item) => {
                html += options.rowBegin()
                html += options.colBegin(false)
                html += format(item) /* RECURSION */
                html += options.colEnd()
                html += options.rowEnd()
            })
            html += options.tableEnd()
        }
        else if (typeof object === "object" && object !== null) {
            html = options.tableBegin()
            Object.keys(object).forEach((key) => {
                html += options.rowBegin()
                html += options.colBegin(true)
                html += key.toString()
                html += options.colEnd()
                html += options.colBegin(false)
                html += format(object[key]) /* RECURSION */
                html += options.colEnd()
                html += options.rowEnd()
            })
            html += options.tableEnd()
        }
        else if (object === null)
            html += "[null]"
        else if (typeof object === "function")
            html += `[Function: ${object.constructor.name}]`
        else
            html += object.toString()
        return html
    }
    return format(object)
}

/*  export the API function  */
module.exports = objectToTable

