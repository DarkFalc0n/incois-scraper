import axios from "axios";
import * as cheerio from "cheerio";
import * as esprima from "esprima";
import estraverse from "estraverse";

export async function scrapeUrl(url: string) {
  axios.request({ method: "GET", url }).then((response) => {
    const $ = cheerio.load(response.data);
    const scriptElem = [...$("body script")].find(
      (elem, i) => {
        return i === 3;
      }
    );
    // console.log($(scriptElem).text().substring(0, 100));
    const ast = esprima.parseScript($(scriptElem).text());
    // console.log(ast.loc);
    estraverse.traverse(ast, {
      enter: function (node, parent) {
        if (
          node.type == "FunctionExpression" ||
          node.type == "FunctionDeclaration"
        )
          return estraverse.VisitorOption.Skip;
      },
      leave: function (node, parent) {
        if (node.type == "VariableDeclarator")
          console.log(node.id);
      },
    });
  });

  return Promise.resolve(
    '[{"name": "John Doe", "age": 30, "city": "New York"}, {"name": "Jane Doe", "age": 25, "city": "San Francisco"}]'
  );
}
