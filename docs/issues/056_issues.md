오후 7:51:48 [vite] Internal server error: C:\aquaticket\aquaticket-front\src\pages\BookGate.tsx: 'return' outside of function. (83:2)

  81 |
  82 |
> 83 |   return (
     |   ^
  84 |     <main style={{ padding: 24, display: "grid", placeItems: "center" }}>
  85 |       <div style={{ width: 420, padding: 24, border: "1px solid #eee", borderRadius: 12 }}>
  86 |         <h2 style={{ marginBottom: 12 }}>보안문자 인증</h2>
  Plugin: vite:react-babel
  File: C:/aquaticket/aquaticket-front/src/pages/BookGate.tsx:83:2
  82 |
  83 |    return (
  84 |      <main style={{ padding: 24, display: "grid", placeItems: "center" }}>
     |                                                                           ^
  85 |        <div style={{ width: 420, padding: 24, border: "1px solid #eee", borderRadius: 12 }}>
  86 |          <h2 style={{ marginBottom: 12 }}>보안문자 인증</h2>
      at constructor (C:\aquaticket\aquaticket-front\node_modules\@babel\parser\lib\index.js:367:19)
      at TypeScriptParserMixin.raise (C:\aquaticket\aquaticket-front\node_modules\@babel\parser\lib\index.js:6630:19)
      at TypeScriptParserMixin.parseReturnStatement (C:\aquaticket\aquaticket-front\node_modules\@babel\parser\lib\index.js:13145:12)
      at TypeScriptParserMixin.parseStatementContent (C:\aquaticket\aquaticket-front\node_modules\@babel\parser\lib\index.js:12807:21)
      at TypeScriptParserMixin.parseStatementContent (C:\aquaticket\aquaticket-front\node_modules\@babel\parser\lib\index.js:9532:18)
      at TypeScriptParserMixin.parseStatementLike (C:\aquaticket\aquaticket-front\node_modules\@babel\parser\lib\index.js:12776:17)
      at TypeScriptParserMixin.parseModuleItem (C:\aquaticket\aquaticket-front\node_modules\@babel\parser\lib\index.js:12753:17)
      at TypeScriptParserMixin.parseBlockOrModuleBlockBody (C:\aquaticket\aquaticket-front\node_modules\@babel\parser\lib\index.js:13325:36)
      at TypeScriptParserMixin.parseBlockBody (C:\aquaticket\aquaticket-front\node_modules\@babel\parser\lib\index.js:13318:10)
      at TypeScriptParserMixin.parseProgram (C:\aquaticket\aquaticket-front\node_modules\@babel\parser\lib\index.js:12634:10)
      at TypeScriptParserMixin.parseTopLevel (C:\aquaticket\aquaticket-front\node_modules\@babel\parser\lib\index.js:12624:25)
      at TypeScriptParserMixin.parse (C:\aquaticket\aquaticket-front\node_modules\@babel\parser\lib\index.js:14501:10)
      at TypeScriptParserMixin.parse (C:\aquaticket\aquaticket-front\node_modules\@babel\parser\lib\index.js:10149:18)
      at parse (C:\aquaticket\aquaticket-front\node_modules\@babel\parser\lib\index.js:14535:38)
      at parser (C:\aquaticket\aquaticket-front\node_modules\@babel\core\lib\parser\index.js:41:34)
      at parser.next (<anonymous>)
      at normalizeFile (C:\aquaticket\aquaticket-front\node_modules\@babel\core\lib\transformation\normalize-file.js:64:37)
      at normalizeFile.next (<anonymous>)
      at run (C:\aquaticket\aquaticket-front\node_modules\@babel\core\lib\transformation\index.js:22:50)
      at run.next (<anonymous>)
      at transform (C:\aquaticket\aquaticket-front\node_modules\@babel\core\lib\transform.js:22:33)
      at transform.next (<anonymous>)
      at step (C:\aquaticket\aquaticket-front\node_modules\gensync\index.js:261:32)
      at C:\aquaticket\aquaticket-front\node_modules\gensync\index.js:273:13
      at async.call.result.err.err (C:\aquaticket\aquaticket-front\node_modules\gensync\index.js:223:11)
      at C:\aquaticket\aquaticket-front\node_modules\gensync\index.js:189:28
      at C:\aquaticket\aquaticket-front\node_modules\@babel\core\lib\gensync-utils\async.js:67:7
      at C:\aquaticket\aquaticket-front\node_modules\gensync\index.js:113:33
      at step (C:\aquaticket\aquaticket-front\node_modules\gensync\index.js:287:14)
      at C:\aquaticket\aquaticket-front\node_modules\gensync\index.js:273:13
      at async.call.result.err.err (C:\aquaticket\aquaticket-front\node_modules\gensync\index.js:223:11) (x5)