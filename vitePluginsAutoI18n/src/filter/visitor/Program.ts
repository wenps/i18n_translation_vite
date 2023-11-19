import * as types from "@babel/types"

export default function (program: any) {
  console.log(program.contexts);
//   program.traverse({
//     JSXElement(path: any) {
//       // 这里的 path.node 是 JSX 节点
//       const jsxNode = path.node;

//       console.log('JSX 节点:', jsxNode);
//     },
//     JSXText(path: any) {
//         console.log('JSX 文本:',  path.node);
//     },
//   });
};