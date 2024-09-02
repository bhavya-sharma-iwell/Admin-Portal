// Removing Attribute with the help of babel
module.exports = function() {
    return {
      visitor: {
        JSXAttribute(path) {
          const attributeName = path.node.name.name
          if (attributeName === "metatitle") {
            path.remove()
          }
        }
      }
    }
  }