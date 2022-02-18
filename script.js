"use strict";

const label = document.querySelector(".label-from");
const labelTo = document.querySelector(".label-to");
const currencies = document.querySelectorAll(".currencies");
const amount = document.querySelector(".amount");
const labelResult = document.querySelector(".result");
const form = document.querySelector("form");
const submitBtn = document.querySelector(".submit-btn");

// Get API data, proceed to display complete list of currencies

const displayRates = async function (el) {
  try {
    const res = await fetch("https://open.er-api.com/v6/latest/BRL");
    if (!res.ok) throw new Error(`Something went wrong, code ${res.status}`);

    const { rates } = await res.json();
    Object.keys(rates).forEach((rate) => {
      const html = document.createElement("option");
      html.value = html.textContent = rate;
      el.append(html);
    });
  } catch (error) {
    console.log(error);
  }
};

displayRates(label);
displayRates(labelTo);

const render = function (result) {
  const html = `${result.toFixed(2)}`;
  labelResult.value = html;
};

// will proceed to do calculations and render it for the user
const exchange = async function (cur1 = "BRL", cur2 = "BRL", amount = 1) {
  try {
    if (isNaN(amount)) throw new Error("Not valid amount");
    const { rates } = await (
      await fetch(`https://open.er-api.com/v6/latest/${cur1}`)
    ).json();
    render(rates[`${cur2}`] * amount);
  } catch (error) {
    console.log(error);
  }
};

let currentCur1, currentCur2;

currencies.forEach((cur, i) =>
  cur.addEventListener("change", (e) => {
    if (i < 1) currentCur1 = e.target.value;
    else currentCur2 = e.target.value;
  })
);

const displayResult = (e) => {
  e.preventDefault();
  exchange(currentCur1, currentCur2, amount.value);
  amount.value = "";
};

form.addEventListener("submit", displayResult);
submitBtn.addEventListener("click", displayResult);
