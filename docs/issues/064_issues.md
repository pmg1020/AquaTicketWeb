오전 4:03:35 [vite] (client) Pre-transform error: Failed to resolve import "../css/SeatMap.css" from "src/components/seat-maps/SeatMap.tsx". Does the file exist?
  Plugin: vite:import-analysis
  File: C:/aquaticket/aquaticket-front/src/components/seat-maps/SeatMap.tsx:4:7
  16 |  }
  17 |  import React from "react";
  18 |  import "../css/SeatMap.css";
     |          ^
  19 |  export default function SeatMap({ area, selectedSeats, onSeatClick }) {
  20 |    if (!area || !area.seats) {
오전 4:03:35 [vite] Internal server error: Failed to resolve import "../css/SeatMap.css" from "src/components/seat-maps/SeatMap.tsx". Does the file exist?
  Plugin: vite:import-analysis
  File: C:/aquaticket/aquaticket-front/src/components/seat-maps/SeatMap.tsx:4:7
  16 |  }
  17 |  import React from "react";
  18 |  import "../css/SeatMap.css";
     |          ^
  19 |  export default function SeatMap({ area, selectedSeats, onSeatClick }) {
  20 |    if (!area || !area.seats) {
      at TransformPluginContext._formatLog (file:///C:/aquaticket/aquaticket-front/node_modules/vite/dist/node/chunks/dep-M_KD0XSK.js:31527:43)
      at TransformPluginContext.error (file:///C:/aquaticket/aquaticket-front/node_modules/vite/dist/node/chunks/dep-M_KD0XSK.js:31524:14)
      at normalizeUrl (file:///C:/aquaticket/aquaticket-front/node_modules/vite/dist/node/chunks/dep-M_KD0XSK.js:29996:18)
      at process.processTicksAndRejections (node:internal/process/task_queues:105:5)
      at async file:///C:/aquaticket/aquaticket-front/node_modules/vite/dist/node/chunks/dep-M_KD0XSK.js:30054:32
      at async Promise.all (index 4)
      at async TransformPluginContext.transform (file:///C:/aquaticket/aquaticket-front/node_modules/vite/dist/node/chunks/dep-M_KD0XSK.js:30022:4)
      at async EnvironmentPluginContainer.transform (file:///C:/aquaticket/aquaticket-front/node_modules/vite/dist/node/chunks/dep-M_KD0XSK.js:31325:14)
      at async loadAndTransform (file:///C:/aquaticket/aquaticket-front/node_modules/vite/dist/node/chunks/dep-M_KD0XSK.js:26407:26)
      at async viteTransformMiddleware (file:///C:/aquaticket/aquaticket-front/node_modules/vite/dist/node/chunks/dep-M_KD0XSK.js:27492:20)
