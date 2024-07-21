document.addEventListener('DOMContentLoaded', function() {
  // Generar 10,000 números aleatorios enteros y guardarlos en un array
  function generateRandomArray(size, min, max) {
      const array = [];
      for (let i = 0; i < size; i++) {
          array.push(Math.floor(Math.random() * (max - min + 1)) + min);
      }
      return array;
  }

  // Bubble Sort
  function bubbleSort(arr) {
      let n = arr.length;
      for (let i = 0; i < n - 1; i++) {
          for (let j = 0; j < n - i - 1; j++) {
              if (arr[j] > arr[j + 1]) {
                  let temp = arr[j];
                  arr[j] = arr[j + 1];
                  arr[j + 1] = temp;
              }
          }
      }
      return arr;
  }

  // Selection Sort
  function selectionSort(arr) {
      let n = arr.length;
      for (let i = 0; i < n - 1; i++) {
          let minIndex = i;
          for (let j = i + 1; j < n; j++) {
              if (arr[j] < arr[minIndex]) {
                  minIndex = j;
              }
          }
          let temp = arr[minIndex];
          arr[minIndex] = arr[i];
          arr[i] = temp;
      }
      return arr;
  }

  // Insertion Sort
  function insertionSort(arr) {
      let n = arr.length;
      for (let i = 1; i < n; i++) {
          let key = arr[i];
          let j = i - 1;
          while (j >= 0 && arr[j] > key) {
              arr[j + 1] = arr[j];
              j = j - 1;
          }
          arr[j + 1] = key;
      }
      return arr;
  }

  // Merge Sort
  function mergeSort(arr) {
      if (arr.length <= 1) {
          return arr;
      }

      const middle = Math.floor(arr.length / 2);
      const left = arr.slice(0, middle);
      const right = arr.slice(middle);

      return merge(
          mergeSort(left),
          mergeSort(right)
      );
  }

  function merge(left, right) {
      let result = [];
      let indexLeft = 0;
      let indexRight = 0;

      while (indexLeft < left.length && indexRight < right.length) {
          if (left[indexLeft] < right[indexRight]) {
              result.push(left[indexLeft]);
              indexLeft++;
          } else {
              result.push(right[indexRight]);
              indexRight++;
          }
      }

      return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
  }

  // Quick Sort
  function quickSort(arr) {
      if (arr.length <= 1) {
          return arr;
      }

      const pivot = arr[arr.length - 1];
      const left = [];
      const right = [];

      for (let i = 0; i < arr.length - 1; i++) {
          if (arr[i] < pivot) {
              left.push(arr[i]);
          } else {
              right.push(arr[i]);
          }
      }

      return quickSort(left).concat(pivot, quickSort(right));
  }
 // Función para medir el tiempo de ejecución de un algoritmo de ordenamiento
 function measureSortPerformance(sortFunction, arr) {
  const start = performance.now();
  sortFunction([...arr]); // Usar una copia del array para evitar modificar el original
  const end = performance.now();
  return end - start;
}

// Función para ejecutar todos los algoritmos y mostrar los resultados
function executeSorts() {
  // Generar el array de números aleatorios
  const randomArray = generateRandomArray(10000, 0, 10000);

  const bubbleSortTime = measureSortPerformance(bubbleSort, randomArray);
  const selectionSortTime = measureSortPerformance(selectionSort, randomArray);
  const insertionSortTime = measureSortPerformance(insertionSort, randomArray);
  const mergeSortTime = measureSortPerformance(mergeSort, randomArray);
  const quickSortTime = measureSortPerformance(quickSort, randomArray);

  // Mostrar los resultados
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = `
      <p>Bubble Sort Time: ${bubbleSortTime.toFixed(2)} ms</p>
      <p>Selection Sort Time: ${selectionSortTime.toFixed(2)} ms</p>
      <p>Insertion Sort Time: ${insertionSortTime.toFixed(2)} ms</p>
      <p>Merge Sort Time: ${mergeSortTime.toFixed(2)} ms</p>
      <p>Quick Sort Time: ${quickSortTime.toFixed(2)} ms</p>
  `;

  // Determinar el algoritmo más rápido
  const times = {
      'Bubble Sort': bubbleSortTime,
      'Selection Sort': selectionSortTime,
      'Insertion Sort': insertionSortTime,
      'Merge Sort': mergeSortTime,
      'Quick Sort': quickSortTime
  };

  const fastestSort = Object.keys(times).reduce((a, b) => times[a] < times[b] ? a : b);

  resultsDiv.innerHTML += `<p class="fastest">El algoritmo de ordenamiento más rápido es: ${fastestSort}</p>`;
}

document.getElementById('sortButton').addEventListener('click', executeSorts);
});