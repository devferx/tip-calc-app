// Variables
let costo = 0;
let porcentaje = 5;
let cantPersonas = 1;

// Variables HTML
const $costoInput = document.querySelector("#costoInput");
const $cantPersonasInput = document.querySelector("#cantPersonasInput");
const $customTipInput = document.querySelector("#customTipInput");

const $tipLabel = document.querySelector("p#tipLabel");
const $totalPersonaLabel = document.querySelector("p#totalPersonaLabel");

const $resetButton = document.querySelector("button#reset-button");
const $percentageButtons = Array.from(document.querySelectorAll("button"))
  .filter((button) => button.textContent.includes("%"))
  .map((btn) =>
    btn.addEventListener("click", () => {
      porcentaje = Number(btn.textContent.replace("%", ""));
      document.querySelector(".active").className = "null";

      btn.classList.remove("null");
      btn.classList.add("active");

      $customTipInput.value = "";

      calcularResultado();
    })
  );

$costoInput.addEventListener("keyup", function () {
  costo = Number(this.value);
  calcularResultado();
});

$customTipInput.addEventListener("keyup", () => {
  porcentaje = Number($customTipInput.value);
  calcularResultado();
});

$cantPersonasInput.addEventListener("change", () => {
  cantPersonas = Number($cantPersonasInput.value);
  calcularResultado();
});

$resetButton.addEventListener("click", () => {
  costo = 0;
  porcentaje = 5;
  cantPersonas = 1;

  $costoInput.value = 0;
  $customTipInput.value = "";
  $cantPersonasInput.value = 1;
  $tipLabel.textContent = "$ tip";
  $totalPersonaLabel.textContent = "$ total";
});

function calcularResultado() {
  const resultado = calcularTarifas(costo, porcentaje, cantPersonas);
  $tipLabel.textContent = `${resultado.propina} Bs.`;
  $totalPersonaLabel.textContent = `${resultado.total} Bs.`;
}

function calcularTarifas(costo, porcentaje, cantPersonas) {
  const propina = (costo * (porcentaje / 100)) / cantPersonas;
  const costoPersona = costo / cantPersonas;
  const total = propina + costoPersona;

  return {
    propina: Number(propina.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
}
