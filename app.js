//listen for submit
document.getElementById("loan-form").addEventListener("submit", function (e) {
  //hide results
 document.getElementById('results').style.display = 'none';
  
  document.getElementById('loading').style.display = 'block';
  //console.log('loading')
  setTimeout(calculateResults, 2000)

  e.preventDefault();
});

//calculate Results
function calculateResults() {
  console.log("Calculating...");
  //UI vars

  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //monthly payments

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    console.log(totalInterest);
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    document.getElementById('results').style.display = 'block';

    document.getElementById('loading').style.display = 'none';
    

  } else {
    showError("Please Check Your Numbers");
  }
}
//show error function
function showError(error) {
  //create a div

  const errorDiv = document.createElement("div");

  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");
  //add class

  errorDiv.className = "alert alert-danger";

  //create node and append to div

  errorDiv.appendChild(document.createTextNode(error));
  //insert error above heading
  card.insertBefore(errorDiv, heading);

  //clear Error timer 3seconds

  setTimeout(clearError, 3000);
  function clearError() {
    document.querySelector(".alert").remove();
  }
}
