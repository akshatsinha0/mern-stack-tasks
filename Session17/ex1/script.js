function reverseNumber() {
  const num = document.getElementById('numberInput').value;
  const reversed = num.split('').reverse().join('');
  document.getElementById('numberOutput').textContent = `Reversed: ${reversed}`;
}
