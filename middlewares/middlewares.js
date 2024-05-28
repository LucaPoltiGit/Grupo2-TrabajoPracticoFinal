export const logger = (req, res, next) => {
     console.log(`🚀 ~ logger ~ req:`, req.method)
     // console.log(`🚀 ~ logger ~ next:`, next)
     console.log("todo ok desdes el midleware");
     next();
   };