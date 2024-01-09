import { useState } from "react";

function HTMLEditor() {
  const [doc, setDoc] = useState(`
  <html>
    <body>
      <style>
        body {
          padding: 50px;
        }
        .container {
          display: inline-block;
          background: rgb(139, 92, 246);
          padding: 20px;
          color: #fff
        }
      </style>

      <div class="container">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad magni odio quo, animi excepturi nam tempore numquam a aut laudantium ratione, asperiores soluta eveniet doloribus modi aliquid impedit error cum!
      </div>

    </body>
  </html>
  `);

  const handleInput = (e) => {
    setDoc(e.target.value);
  };

  return (
    <div>
      <div className="pb-4">修改代码实时渲染</div>

      <textarea
        cols="120"
        rows="12"
        className="outline-none w-full h-full border-b border-t border-gray-400"
        value={doc}
        onInput={handleInput}
      ></textarea>

      <iframe name="iframe" srcDoc={doc} className="w-full h-full"></iframe>
    </div>
  );
}

export default HTMLEditor;
