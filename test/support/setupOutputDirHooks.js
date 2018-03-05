const fs = require('fs');
const path = require('path');

module.exports = function(outputDir) {
  before(function() {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }
  });

  afterEach(function() {
    fs.readdir(outputDir, (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(outputDir, file), (err) => {
          if (err) throw err;
        });
      }
    });
  });

  after(function() {
    fs.rmdir(outputDir, function(err) {
      if (err) console.log(err);
    });
  });
};
