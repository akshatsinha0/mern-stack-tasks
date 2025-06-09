function alphabeticalOrder() {
  const str = document.getElementById('stringInput').value;
  const sorted = str.split('').sort().join('');
  document.getElementById('stringOutput').textContent = `Sorted: ${sorted}`;
}
