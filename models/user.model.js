const bcrypt = require("bcryptjs");

const db = require("../data/database");

class User {
  constructor(email, password, fullname, semester, faculty) {
    this.email = email;
    this.password = password;
    this.name = fullname;
    this.semester = semester;
    this.faculty = faculty;
  }

  getUserWithSameEmail() {
    return db.getDb().collection("users").findOne({ email: this.email});
  }
  async existsAlready(){
    const existingUser = await this.getUserWithSameEmail();
    if(existingUser) {
      return true;
    }
    return false;
  }

  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    await db.getDb().collection("users").insertOne({
      email: this.email,
      password: hashedPassword,
      name: this.name,
      semester: this.semester,
      faculty: this.faculty,
    });
  }
  hasMatchingPassword(hashedPassword) {
     return bcrypt.compare(this.password, hashedPassword);
  }
}

module.exports = User;
