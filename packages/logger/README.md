# @hammerhq/logger

😎 Cool looking logs for everyone!

```js
const { Logger } = require("@hammerhq/logger");

const logger = new Logger("[MyLogger]:");

logger.log("Hello World!");
logger.info("Info message");
logger.success("Success message");
logger.warning("Warning message");
logger.error("Error message");
logger.event("Event message");
logger.debug("Debug message");
```

![output](./example.png)
