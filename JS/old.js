// function Employee(name, age) {
//   if (!(this instanceof Employee)) {
//     return new Employee(name, age);
//   }

//   let porcentIncress = 0.2;

//   this.name = name;
//   this.age = age;
//   this.salary = 0;
//   this.incressSalary = function () {
//     this.salary += this.salary * porcentIncress;
//   };
// }


function Rectangle(width, height) {
    this.width = width;
    this.height = height;
  
    this.area = function () {
      return this.width * this.height;
    };
  }
  
  function Square(size) {
      this.width = size;
      this.height = size;
  }
  
  Square.prototype = new Rectangle();
  
  const square = new Square(10);
  console.log(square.area());