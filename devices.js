let count = 0;
document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", () => {
    count++;
    document.getElementById("cart-count").innerText = count;
  });
});

