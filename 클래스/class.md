# 클래스

- 자바스크립트의 클래스는 다른 객체지향 언어의 클래스와 같은 개념이 아닌 프로토타입 기반의 객체 생성 매커니즘이다.
- 클래스는 생성자 함수와 마찬가지로 프로토타입 기반의 인스턴스를 생성하는 constructor인 함수이나 생성자 함수와는 일부 차이점이 존재한다.
  - 1. 호이스팅
    - 클래스 : 호이스팅이 발생하지 않는 것처럼 동작한다.(TDZ)
    - 생성자 함수 : 함수 선언문은 함수 호이스팅, 함수 표현식은 변수 호이스팅이 발생한다.
  - 2. new 연산자 없이 호출
    - 클래스 : new 연산자 없이 호출하면 에러가 발생한다.
    - 생성자 함수 : new 연산자 없이 호출하면 일반 함수로서 호출된다.
  - 3. strict mode
    - 클래스 : 암묵적으로 strict mode가 적용되며 해제할 수 없다.
    - 생성자 함수 : 암묵적으로 strict mode가 적용되지 않는다. 명시적으로 적용해야 한다.
  - 4. 열거 가능 여부 (프로퍼티 어트리뷰트 [[Enumerable]])
    - 클래스 : constructor, 프로토타입 메서드, 정적 메서드 [[Enumerable]]이 false다. (열거 X)
    - 생성자 함수 : 프로토타입 메서드 [[Enumerable]]이 true다. (열거 O)

## 메서드

- 클래스의 몸체에는 0개 이상의 메서드만 정의할 수 있다.
- 클래스 몸체에서 정의할 수 있는 메서드는 생성자 메서드 constructor, 프로토타입 메서드, 정적 메서드 세 가지이다.
- 클래스에서 정의한 메서드의 특징
  - function 키워드를 생략한 메서드 축약 표현 사용
  - 클래스는 함수이다. 따라서 메서드를 정의할 때 메서드 사이를 콤마로 구분할 필요가 없다.
  - 프로퍼티 어트리뷰트 [[Enumerable]]의 값이 false다. (열거 X)
  - 암묵적으로 strict mode가 적용된다.
  - 내부 메서드 [[Construct]] 를 갖지 않는 non-constructor 이므로 new 연산자와 함께 호출할 수 없다.

### 생성자 메서드 constructor

- constructor는 인스턴스를 생성하고 초기화하기 위한 특수한 메서드이다. 이름을 변경할 수 없다.
- constructor 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
- constructor는 생략할 수 있다. 이때 클래스에 constructor가 없다면 암묵적으로 빈 constructor가 생성된다.
- constructor는 클래스 내에 최대 한 개만 존재할 수 있다.
- constructor 메서드는 메서드로 해석되는 것이 아니라 클래스 평가 시 클래스 함수 객체 코드의 일부가 된다.
- 인스턴스 생성 시 인스턴스 프로퍼티의 초기값을 전달하려면 constructor에 매개변수를 선언해야 한다.
- 생성자 함수와 마찬가지로 constructor는 별도의 반환문을 갖지 않아야 한다. 암묵적으로 this(인스턴스)를 반환한다.

### 프로토타입 메서드

- 생성자 함수에서 프로토타입 메서드를 생성하기 위해선 명시적으로 생성자 함수의 prototype 프로퍼티에 메서드를 추가해야 했으나, 클래스는 단순히 클래스 몸체 내부에서 메서드를 정의할 경우 기본적으로 프로토타입 메서드가 된다.
- 프로토타입 메서드는 인스턴스로 호출하며, 인스턴스 프로퍼티를 참조할 수 있다. (정적 메서드는 클래스로 호출)
- 메서드 호출 시 메서드 내부의 this는 메서드를 호출한 객체를 가리키므로, 프로토타입 메서드 호출 시 프로토타입 메서드 내부의 this는 자신을 호출한 인스턴스가 된다.
- 프로토타입 메서드와 정적 메서드는 자신이 속해 있는 프로토타입 체인이 다르다.

```js
// 생성자 함수
function Person(name) {
  this.name = name;
}
// 프로토타입 메서드
Person.prototype.sayHi = function () {
  console.log(`Hi! My name is ${this.name}`);
};
```

```js
// 클래스
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name;
  }
  // 프로토타입 메서드
  sayHi() {
    console.log(`Hi! My name is ${this.name}`);
  }
}
```

### 정적 메서드

- 정적 메서드 : 인스턴스를 생성하지 않아도 호출할 수 있는 메서드
- 생성자 함수에서 정적 메서드를 생성하려면 명시적으로 생성자 함수에 메서드를 추가해야 했으나, 클래스는 단순히 static 키워드를 메서드 앞에 붙이기만 하면 정적 메서드(클래스 메서드)가 된다.
- 정적 메서드는 인스턴스로 호출할 수 없다. 인스턴스의 프로토타입 체인 상에는 클래스가 존재하지 않기 때문이다. (모딥다 p431 그림 25-5 참고)
  - 따라서 인스턴스로 호출할 수 없고 인스턴스의 프로퍼티를 참조할 수 없기 때문에 정적 메서드는 클래스의 인스턴스가 아닌 클래스에 관련된 메서드를 정의할 때 사용한다.

```js
// 생성자 함수
function Person(name) {
  this.name = name;
}
// 정적 메서드
Person.sayHi = function () {
  console.log('Hi!');
};
```

```js
// 클래스
class Person {
  // 생성자
  constructor(name) {
    // 인스턴스 생성 및 초기화
    this.name = name;
  }
  // 정적 메서드
  static sayHi() {
    console.log('Hi!');
  }
}
```

## 클래스의 인스턴스 생성과정

### 1. 인스턴스 생성과 this 바인딩

- new 연산자와 함께 클래스 호출 시 constructor 내부 코드 실행에 앞서 암묵적으로 인스턴스가 되는 빈 객체가 생성된다.(이 때 인스턴스의 프로토타입으로 클래스의 prototype 프로퍼티 객체에 대한 참조가 설정됨)
- 생성된 빈 객체(인스턴스)가 this에 바인딩된다.

### 2. 인스턴스 초기화

- constructor 내부 코드가 실행되어 this에 바인딩되어 있는 인스턴스를 초기화한다.
- 만약 constructor가 생략되었다면 이 과정은 생략된다.
- constructor에 정의한 매개변수를 통해 외부에서 인수로 전달받은 초기값으로 인스턴스의 프로퍼티 값을 초기화한다.

### 3. 인스턴스 반환

- constructor 내부 코드가 모두 실행되고 인스턴스가 완성되면 암묵적으로 인스턴스가 바인딩된 this가 반환된다.

## 프로퍼티

### 인스턴스 프로퍼티

```js
class Person {
  constructor(name) {
    // 인스턴스 프로퍼티 name 추가
    this.name = name;
  }
}

const me = new Person('Kim');
console.log(me); // Person { name: 'Kim' }
```

- 인스턴스 프로퍼티는 constructor 내부에서 정의해야 한다.
  - Why? : new 연산자와 함께 클래스 호출 시 constructor 내부 코드 실행 이전에 암묵적으로 인스턴스가 되는 빈 객체가 생성되고 this에 바인딩되기 때문이다. 이후 인스턴스 초기화 단계에서 constructor 내부 코드가 실행되면서 this에 인스턴스 프로퍼티를 추가한다.
- constructor 내부에서 this에 추가한 프로퍼티는 언제나 클래스가 생성할 인스턴스의 프로퍼티가 되므로 constructor 내부에서 this에 추가한 프로퍼티를 인스턴스 프로퍼티라 한다.
- ES6 클래스는 private, public, protected 등 접근 제한자를 제공하지 않으므로 인스턴스 프로퍼티는 언제나 public 하다. (private 필드 정의 제안의 실험적 기능 또는 TS 사용 시 private, protected, public 지정 가능)

### 접근자 프로퍼티

```js
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  set fullName(name) {
    [this.firstName, this.lastName] = name.split(' ');
  }
}

const me = new Person('Ryan', 'Kim');

// 데이터 프로퍼티를 통한 값의 참조
console.log(`${me.firstName} ${me.lastName}`); // Ryan Kim

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
// setter는 호출하는 것이 아니라 프로퍼티에 값을 할당하는 형식으로 사용한다.
me.fullName = 'Peter Park'; // 이 때 내부적으로 setter가 호출된다.
console.log(me); // Person { firstName: 'Peter', lastName: 'Park' }

// 접근자 프로퍼티를 통한 프로퍼티 값의 참조
// getter는 호출하는 것이 아니라 프로퍼티를 참조하는 형식으로 사용한다.
console.log(me.fullName); // Peter Park (이 때 내부적으로 getter가 호출된다.)

// 클래스의 접근자 프로퍼티는 인스턴스의 프로퍼티가 아닌 프로토타입의 프로퍼티다.
Object.getOwnPropertyNames(Object.getPrototypeOf(me)); // ['constructor', 'fullName']
Object.getOwnPropertyDescriptors(me); // {firstName: {...}, lastName: {...}}
// getOwnPropertyNames : 상속받은 프로퍼티를 제외하고 비열거형을 포함한 모든 프로퍼티의 이름을 반환
Object.getOwnPropertyNames(me); // ['firstName', 'lastName']
```

- 접근자 프로퍼티 : 자체적으로는 값([[Value]] 내부 슬롯)을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자 함수로 구성된 프로퍼티
- 접근자 프로퍼티는 getter/setter 접근자 함수로 구성된다.
- getter/setter 이름은 호출하는 것이 아니라 객체의 프로퍼티를 참조/할당하는 형식으로 사용한다.
  - getter : `인스턴스이름.getter이름`
  - setter : `인스턴스이름.setter이름 = 값`
- getter
  - 메서드 이름 앞에 get 키워드를 사용하여 정의한다.
  - 무언가를 취득할 때 사용하므로 반드시 반환값이 있어야 한다.
- setter
  - 메서드 이름 앞에 set 키워드를 사용하여 정의한다.
  - 무언가를 프로퍼티에 할당할 때 사용하므로 반드시 매개변수가 선언되어야 한다.
  - setter는 단 하나의 값만 할당받기 때문에 단 하나의 매개변수만 선언할 수 있다.
- 클래스의 메서드는 기본적으로 프로토타입 메서드가 되므로 접근자 프로퍼티 또한 프로토타입 메서드가 되기 때문에 접근자 프로퍼티는 인스턴스 프로퍼티가 아닌 프로토타입의 프로퍼티가 된다.

## 상속에 의한 클래스 확장

- 상속에 의한 클래스 확장은 기존 클래스를 상속받아 새로운 클래스를 확장하여 정의하는 것으로, 기존의 프로토타입 체인을 통해 다른 객체의 자산을 상속받는 프로토타입 기반의 상속과는 다른 개념이다.
