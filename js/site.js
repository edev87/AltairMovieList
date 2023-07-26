const getValues = () => {
  let fizzVal = document.getElementById('fizz-value').value;
  let buzzVal = document.getElementById('buzz-value').value;
  let stopVal = document.getElementById('stop-value').value;

  let convertFizzValToNum = Number(fizzVal);
  let convertBuzzValToNum = Number(buzzVal);
  let convertStopValToNum = Number(stopVal);

  if (convertFizzValToNum != 3 || convertBuzzValToNum != 5 ||
    isNaN(convertFizzValToNum) || isNaN(convertBuzzValToNum)) {

    Swal.fire({
      title: 'Oops!',
      text: 'Fizz can only be 3. Buzz can only be 5. Try your inputs again.',
      icon: 'error',
      backdrop: false
    });
  }
  else if (convertStopValToNum > 5000) {
    Swal.fire({
      title: 'Oops!',
      text: 'The stop value cannot be greater than 5000',
      icon: 'error',
      backdrop: false
    });
  }

  let passFizzBuzzCollection = generateFizzBuzz(convertFizzValToNum, convertBuzzValToNum, convertStopValToNum);

  displayFizzBuzz(passFizzBuzzCollection, convertStopValToNum);


}

const generateFizzBuzz = (convertFizzValToNum, convertBuzzValToNum, convertStopValToNum) => {
  let fizzBuzzNumbers = [];
 
  for (let i = 1; i <= convertStopValToNum; i++) {

    if (i % 3 === 0 && i % 5 === 0) {
      fizzBuzzNumbers.push("FizzBuzz")
    } else if (i % 5 === 0) {
      fizzBuzzNumbers.push("Buzz")
    }
    else if (i % 3 === 0) {
      fizzBuzzNumbers.push("Fizz")
    }
    else {
      fizzBuzzNumbers.push(i)
    }
  }

  return fizzBuzzNumbers;

}

const displayFizzBuzz = (passFizzBuzzCollection) => {
  let tableHtml = '';

  for (let i = 0; i < passFizzBuzzCollection.length; i++) {
    let currentNumber = passFizzBuzzCollection[i];
    let className = '';
    if (currentNumber === "Fizz") {
      className = "fizz text-light";
    }
    else if (currentNumber === "Buzz") {
      className = "buzz text-light";
    }
    else if (currentNumber === "FizzBuzz") {
      className = "fizzbuzz text-light";
    }
    else {
      className = ""
    }

    let tableRowHtml = `<tr><td class="${className}"> ${currentNumber} </td></tr>`
   
    tableHtml += tableRowHtml;
  }

  document.getElementById("results").innerHTML = tableHtml

}

const clearDisplay = () => {
  document.getElementById("results").innerHTML = " ";
}