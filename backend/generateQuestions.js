import { writeFileSync } from 'fs';

const complexities = ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(n³)', 'O(2ⁿ)', 'O(n!)'];

const questionTemplates = [
  // Algorithm identification questions
  { prompt: 'What is the time complexity of accessing an array element by index?', answer: 'O(1)', explanation: 'Array access by index is O(1) - constant time.' },
  { prompt: 'What is the time complexity of Binary Search?', answer: 'O(log n)', explanation: 'Binary Search halves the search space each iteration.' },
  { prompt: 'What is the time complexity of Linear Search?', answer: 'O(n)', explanation: 'Linear Search must check each element in worst case.' },
  { prompt: 'What is the time complexity of Bubble Sort?', answer: 'O(n²)', explanation: 'Bubble Sort uses nested loops comparing all pairs.' },
  { prompt: 'What is the time complexity of Merge Sort?', answer: 'O(n log n)', explanation: 'Merge Sort divides and merges in logarithmic levels.' },
  { prompt: 'What is the time complexity of Quick Sort (average case)?', answer: 'O(n log n)', explanation: 'Quick Sort averages O(n log n) with good pivots.' },
  { prompt: 'What is the time complexity of Quick Sort (worst case)?', answer: 'O(n²)', explanation: 'Poor pivot selection leads to O(n²) worst case.' },
  { prompt: 'What is the time complexity of Insertion Sort (worst case)?', answer: 'O(n²)', explanation: 'Worst case occurs with reverse-sorted input.' },
  { prompt: 'What is the time complexity of Selection Sort?', answer: 'O(n²)', explanation: 'Selection Sort always performs n² comparisons.' },
  { prompt: 'What is the time complexity of Heap Sort?', answer: 'O(n log n)', explanation: 'Heap Sort maintains O(n log n) in all cases.' },
  
  // Data structure operations
  { prompt: 'What is the time complexity of searching in a balanced BST?', answer: 'O(log n)', explanation: 'Balanced trees maintain logarithmic height.' },
  { prompt: 'What is the time complexity of hash table lookup (average)?', answer: 'O(1)', explanation: 'Hash tables provide constant average lookup.' },
  { prompt: 'What is the time complexity of inserting at array start?', answer: 'O(n)', explanation: 'Must shift all existing elements.' },
  { prompt: 'What is the time complexity of stack push operation?', answer: 'O(1)', explanation: 'Stack operations are constant time.' },
  { prompt: 'What is the time complexity of queue enqueue?', answer: 'O(1)', explanation: 'Queue operations are constant time.' },
  
  // Growth pattern questions
  { prompt: 'Which complexity represents constant time?', answer: 'O(1)', explanation: 'O(1) means time independent of input size.' },
  { prompt: 'Which complexity represents logarithmic growth?', answer: 'O(log n)', explanation: 'O(log n) grows very slowly, typical of divide-and-conquer.' },
  { prompt: 'Which complexity represents linear growth?', answer: 'O(n)', explanation: 'O(n) means time proportional to input size.' },
  { prompt: 'Which complexity represents quadratic growth?', answer: 'O(n²)', explanation: 'O(n²) often comes from nested loops.' },
  { prompt: 'Which complexity represents cubic growth?', answer: 'O(n³)', explanation: 'O(n³) typically from three nested loops.' },
  { prompt: 'Which complexity represents exponential growth?', answer: 'O(2ⁿ)', explanation: 'O(2ⁿ) doubles with each input increment.' },
  { prompt: 'Which complexity represents factorial growth?', answer: 'O(n!)', explanation: 'O(n!) is the fastest growing common complexity.' },
  
  // Comparison questions
  { prompt: 'Which grows faster: O(n) or O(n log n)?', answer: 'O(n log n)', explanation: 'O(n log n) grows faster than linear O(n).' },
  { prompt: 'Which grows faster: O(n²) or O(2ⁿ)?', answer: 'O(2ⁿ)', explanation: 'Exponential always beats polynomial.' },
  { prompt: 'Which grows faster: O(2ⁿ) or O(n!)?', answer: 'O(n!)', explanation: 'Factorial grows faster than exponential.' },
  { prompt: 'Which grows faster: O(log n) or O(n)?', answer: 'O(n)', explanation: 'Linear grows faster than logarithmic.' },
  { prompt: 'Which grows fastest among these?', answer: 'O(n!)', explanation: 'Factorial is the fastest common complexity.' },
  
  // Advanced algorithms
  { prompt: 'What is the complexity of Matrix Multiplication (naive)?', answer: 'O(n³)', explanation: 'Three nested loops give cubic complexity.' },
  { prompt: 'What is the complexity of generating all subsets?', answer: 'O(2ⁿ)', explanation: 'There are 2ⁿ possible subsets.' },
  { prompt: 'What is the complexity of generating all permutations?', answer: 'O(n!)', explanation: 'There are n! possible permutations.' },
  { prompt: 'What is the complexity of DFS graph traversal?', answer: 'O(n)', explanation: 'DFS visits each vertex and edge once.' },
  { prompt: 'What is the complexity of BFS graph traversal?', answer: 'O(n)', explanation: 'BFS visits each vertex and edge once.' },
  
  // Space complexity
  { prompt: 'What is the space complexity of Merge Sort?', answer: 'O(n)', explanation: 'Merge Sort requires additional O(n) space.' },
  { prompt: 'What is the space complexity of Quick Sort?', answer: 'O(log n)', explanation: 'Quick Sort uses O(log n) stack space.' },
  { prompt: 'What is the space complexity of Heap Sort?', answer: 'O(1)', explanation: 'Heap Sort sorts in-place with O(1) space.' },
  { prompt: 'What is the space complexity of copying an array?', answer: 'O(n)', explanation: 'Need n space to store n elements.' },
  
  // Practical scenarios
  { prompt: 'Best complexity for searching sorted data?', answer: 'O(log n)', explanation: 'Binary search on sorted data is O(log n).' },
  { prompt: 'Best complexity for general sorting?', answer: 'O(n log n)', explanation: 'Comparison sorts cannot beat O(n log n).' },
  { prompt: 'Complexity of checking if number is prime (trial division)?', answer: 'O(n)', explanation: 'Must check divisors up to sqrt(n).' },
  { prompt: 'Complexity of finding max in unsorted array?', answer: 'O(n)', explanation: 'Must examine all elements.' },
  { prompt: 'Complexity of palindrome check?', answer: 'O(n)', explanation: 'Must check all characters.' },
  { prompt: 'Complexity of reversing an array?', answer: 'O(n)', explanation: 'Must swap n/2 pairs of elements.' }
];

const questions = [];
let id = 1;

// Generate 300 questions by reusing and varying templates
for (let round = 0; round < 8; round++) {
  for (const template of questionTemplates) {
    if (id > 300) break;
    
    const correctComplexity = template.answer;
    const otherComplexities = complexities.filter(c => c !== correctComplexity);
    const shuffledOthers = otherComplexities.sort(() => Math.random() - 0.5);
    const options = [correctComplexity, ...shuffledOthers.slice(0, 3)];
    
    // Shuffle options
    const shuffledOptions = options.sort(() => Math.random() - 0.5);
    const correctId = ['a', 'b', 'c', 'd'][shuffledOptions.indexOf(correctComplexity)];
    
    questions.push({
      id: id++,
      prompt: template.prompt,
      options: shuffledOptions.map((label, idx) => ({
        id: ['a', 'b', 'c', 'd'][idx],
        graphDef: { type: 'complexity', label }
      })),
      correctOptionId: correctId,
      explanation: template.explanation
    });
  }
}

// Fill remaining spots with variation questions
while (questions.length < 300) {
  const template = questionTemplates[questions.length % questionTemplates.length];
  const correctComplexity = template.answer;
  const otherComplexities = complexities.filter(c => c !== correctComplexity);
  const shuffledOthers = otherComplexities.sort(() => Math.random() - 0.5);
  const options = [correctComplexity, ...shuffledOthers.slice(0, 3)];
  const shuffledOptions = options.sort(() => Math.random() - 0.5);
  const correctId = ['a', 'b', 'c', 'd'][shuffledOptions.indexOf(correctComplexity)];
  
  questions.push({
    id: id++,
    prompt: `${template.prompt} (variant ${Math.floor(questions.length / questionTemplates.length)})`,
    options: shuffledOptions.map((label, idx) => ({
      id: ['a', 'b', 'c', 'd'][idx],
      graphDef: { type: 'complexity', label }
    })),
    correctOptionId: correctId,
    explanation: template.explanation
  });
}

writeFileSync('./src/data/questions.json', JSON.stringify(questions, null, 2));
console.log(`✅ Generated ${questions.length} quiz questions`);
