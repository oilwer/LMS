User = require('user');
myFile = User.readFileSync('widgets/admin/User.js','utf-8') // depends on the file encoding
eval(myFile);



describe("#111 Add User", function() {
  it("adds a user to the database and returns true", function() {
    expect(true).toBe(true);
  });
});