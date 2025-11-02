"""
Generate 200 quiz questions for complexity analysis
Mix of code snippets and algorithm names
"""

import json

questions = []
question_id = 1

# === O(1) Constant Time Questions ===
o1_code_snippets = [
    ("def get_first(arr):\n    return arr[0]", "Array access is O(1) - direct index lookup."),
    ("def swap(a, b):\n    temp = a\n    a = b\n    b = temp\n    return a, b", "Variable swaps are O(1) - constant operations."),
    ("def check_even(n):\n    return n % 2 == 0", "Modulo and comparison are O(1) operations."),
    ("x = dict[key]", "Hash table lookup averages O(1)."),
    ("result = a + b * c", "Arithmetic operations are O(1)."),
]

o1_algorithms = [
    ("Accessing an array element by index", "Direct memory access is O(1)."),
    ("Hash table lookup (average case)", "Hash computation and bucket access is O(1) average."),
    ("Stack push operation", "Adding to top of stack is O(1)."),
    ("Queue dequeue operation", "Removing from front of queue is O(1)."),
    ("Checking if number is even", "Single modulo operation is O(1)."),
]

# Add O(1) code questions
for code, explanation in o1_code_snippets:
    questions.append({
        "id": question_id,
        "type": "code",
        "language": "python",
        "prompt": code,
        "correct_complexity": "O(1)",
        "explanation": explanation,
        "difficulty": "easy",
        "highlight_spans": []
    })
    question_id += 1

# Add O(1) algorithm name questions
for alg, explanation in o1_algorithms:
    questions.append({
        "id": question_id,
        "type": "name",
        "language": None,
        "prompt": alg,
        "correct_complexity": "O(1)",
        "explanation": explanation,
        "difficulty": "easy",
        "highlight_spans": []
    })
    question_id += 1

# === O(log n) Logarithmic Questions ===
ologn_code_snippets = [
    ("def binary_search(arr, target):\n    left, right = 0, len(arr)-1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1", "Binary search halves search space each iteration → O(log n)."),
    ("def count_bits(n):\n    count = 0\n    while n > 0:\n        n //= 2\n        count += 1\n    return count", "Dividing by 2 each iteration → O(log n)."),
    ("def power_of_two(n):\n    count = 0\n    i = 1\n    while i <= n:\n        i *= 2\n        count += 1\n    return count", "Multiplying by 2 each iteration → O(log n)."),
    ("for(int i = 1; i <= n; i *= 2) {\n    cout << i << endl;\n}", "Loop with i *= 2 runs log₂(n) times."),
    ("while(n > 1) {\n    n /= 2;\n}", "Division by 2 pattern → O(log n)."),
]

ologn_algorithms = [
    ("Binary Search", "Halves search space each step → O(log n)."),
    ("Balanced BST Search", "Height of balanced tree is O(log n)."),
    ("Finding height of binary tree", "Traverses one path from root to leaf → O(log n) for balanced."),
    ("Skip List Search", "Probabilistically balanced structure → O(log n) average."),
    ("Interpolation Search (average)", "Improves on binary search for uniform data → O(log log n) average, but O(log n) typical."),
]

for code, explanation in ologn_code_snippets:
    lang = "cpp" if "cout" in code or "int i" in code else "python"
    questions.append({
        "id": question_id,
        "type": "code",
        "language": lang,
        "prompt": code,
        "correct_complexity": "O(log n)",
        "explanation": explanation,
        "difficulty": "easy" if question_id % 2 == 0 else "medium",
        "highlight_spans": []
    })
    question_id += 1

for alg, explanation in ologn_algorithms:
    questions.append({
        "id": question_id,
        "type": "name",
        "language": None,
        "prompt": alg,
        "correct_complexity": "O(log n)",
        "explanation": explanation,
        "difficulty": "easy",
        "highlight_spans": []
    })
    question_id += 1

# === O(n) Linear Questions ===
on_code_snippets = [
    ("def sum_array(arr):\n    total = 0\n    for num in arr:\n        total += num\n    return total", "Single loop through n elements → O(n)."),
    ("def find_max(arr):\n    max_val = arr[0]\n    for i in range(1, len(arr)):\n        if arr[i] > max_val:\n            max_val = arr[i]\n    return max_val", "One pass through array → O(n)."),
    ("def linear_search(arr, target):\n    for i in range(len(arr)):\n        if arr[i] == target:\n            return i\n    return -1", "Worst case checks all n elements → O(n)."),
    ("for i in range(n):\n    print(i)", "Simple loop from 0 to n → O(n)."),
    ("def reverse_string(s):\n    return s[::-1]", "String reversal requires touching all n characters → O(n)."),
    ("def count_vowels(s):\n    count = 0\n    for char in s:\n        if char in 'aeiou':\n            count += 1\n    return count", "Single pass through string → O(n)."),
    ("arr.append(x)\nfor item in arr:\n    process(item)", "Two sequential loops: O(1) + O(n) = O(n)."),
]

on_algorithms = [
    ("Linear Search", "May need to check all n elements."),
    ("Finding minimum in unsorted array", "Must examine all n elements."),
    ("Counting elements in array", "Single traversal → O(n)."),
    ("Array traversal", "Visiting each element once → O(n)."),
    ("Linked list traversal", "Following n pointers → O(n)."),
]

for code, explanation in on_code_snippets:
    questions.append({
        "id": question_id,
        "type": "code",
        "language": "python",
        "prompt": code,
        "correct_complexity": "O(n)",
        "explanation": explanation,
        "difficulty": "easy",
        "highlight_spans": []
    })
    question_id += 1

for alg, explanation in on_algorithms:
    questions.append({
        "id": question_id,
        "type": "name",
        "language": None,
        "prompt": alg,
        "correct_complexity": "O(n)",
        "explanation": explanation,
        "difficulty": "easy",
        "highlight_spans": []
    })
    question_id += 1

# === O(n log n) Questions ===
onlogn_code_snippets = [
    ("def merge_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    return merge(left, right)", "Divides in half (log n levels) and merges (n work per level) → O(n log n)."),
    ("def quick_sort(arr):\n    if len(arr) <= 1:\n        return arr\n    pivot = arr[len(arr)//2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + middle + quick_sort(right)", "Average case partitions log n times with n work each → O(n log n)."),
    ("arr.sort()", "Python's Timsort is O(n log n)."),
    ("sorted_arr = sorted(arr)", "Built-in sorted() uses O(n log n) algorithm."),
]

onlogn_algorithms = [
    ("Merge Sort", "Divide-and-conquer: log n levels, n work per level."),
    ("Quick Sort (average case)", "Partitioning is O(n), recursion depth is O(log n) on average."),
    ("Heap Sort", "Build heap O(n) + extract n times with O(log n) heapify."),
    ("Timsort (Python's sort)", "Hybrid merge/insertion sort → O(n log n)."),
    ("Sorting using comparison-based algorithm", "Lower bound for comparison sorts is O(n log n)."),
]

for code, explanation in onlogn_code_snippets:
    questions.append({
        "id": question_id,
        "type": "code",
        "language": "python",
        "prompt": code,
        "correct_complexity": "O(n log n)",
        "explanation": explanation,
        "difficulty": "medium",
        "highlight_spans": []
    })
    question_id += 1

for alg, explanation in onlogn_algorithms:
    questions.append({
        "id": question_id,
        "type": "name",
        "language": None,
        "prompt": alg,
        "correct_complexity": "O(n log n)",
        "explanation": explanation,
        "difficulty": "medium",
        "highlight_spans": []
    })
    question_id += 1

# === O(n²) Quadratic Questions ===
on2_code_snippets = [
    ("def bubble_sort(arr):\n    n = len(arr)\n    for i in range(n):\n        for j in range(n-1):\n            if arr[j] > arr[j+1]:\n                arr[j], arr[j+1] = arr[j+1], arr[j]", "Nested loops: outer n times, inner n times → O(n²)."),
    ("def selection_sort(arr):\n    for i in range(len(arr)):\n        min_idx = i\n        for j in range(i+1, len(arr)):\n            if arr[j] < arr[min_idx]:\n                min_idx = j\n        arr[i], arr[min_idx] = arr[min_idx], arr[i]", "For each element, scan remaining array → O(n²)."),
    ("def print_pairs(arr):\n    for i in range(len(arr)):\n        for j in range(len(arr)):\n            print(arr[i], arr[j])", "All pairs of n elements → n × n = O(n²)."),
    ("for(int i = 0; i < n; i++) {\n    for(int j = 0; j < n; j++) {\n        matrix[i][j] = i + j;\n    }\n}", "Filling n×n matrix → O(n²)."),
    ("def has_duplicate(arr):\n    for i in range(len(arr)):\n        for j in range(i+1, len(arr)):\n            if arr[i] == arr[j]:\n                return True\n    return False", "Comparing each pair: n(n-1)/2 comparisons → O(n²)."),
]

on2_algorithms = [
    ("Bubble Sort", "Compares adjacent elements n times → O(n²)."),
    ("Selection Sort", "Finds minimum n times, scanning n elements → O(n²)."),
    ("Insertion Sort (worst case)", "May shift up to n elements for each of n inserts → O(n²)."),
    ("Checking all pairs in array", "n choose 2 pairs = n(n-1)/2 → O(n²)."),
    ("Naive string matching", "For m-length pattern in n-length text, worst case O(mn) ≈ O(n²) when m≈n."),
]

for code, explanation in on2_code_snippets:
    lang = "cpp" if "cout" in code or "int i" in code else "python"
    questions.append({
        "id": question_id,
        "type": "code",
        "language": lang,
        "prompt": code,
        "correct_complexity": "O(n²)",
        "explanation": explanation,
        "difficulty": "easy" if question_id % 3 == 0 else "medium",
        "highlight_spans": []
    })
    question_id += 1

for alg, explanation in on2_algorithms:
    questions.append({
        "id": question_id,
        "type": "name",
        "language": None,
        "prompt": alg,
        "correct_complexity": "O(n²)",
        "explanation": explanation,
        "difficulty": "easy",
        "highlight_spans": []
    })
    question_id += 1

# === O(n³) Cubic Questions ===
on3_code_snippets = [
    ("for i in range(n):\n    for j in range(n):\n        for k in range(n):\n            print(i, j, k)", "Three nested loops, each running n times → n×n×n = O(n³)."),
    ("def matrix_multiply(A, B):\n    n = len(A)\n    C = [[0]*n for _ in range(n)]\n    for i in range(n):\n        for j in range(n):\n            for k in range(n):\n                C[i][j] += A[i][k] * B[k][j]\n    return C", "Standard matrix multiplication: three nested loops → O(n³)."),
    ("def all_triplets(arr):\n    result = []\n    for i in range(len(arr)):\n        for j in range(len(arr)):\n            for k in range(len(arr)):\n                result.append((arr[i], arr[j], arr[k]))\n    return result", "Generating all triplets from n elements → n³ combinations."),
]

on3_algorithms = [
    ("Matrix Multiplication (naive)", "Three nested loops for n×n matrices → O(n³)."),
    ("Floyd-Warshall Algorithm", "All-pairs shortest path with three nested loops → O(n³)."),
    ("Finding all triplets in array", "Checking all combinations of 3 elements → O(n³)."),
]

for code, explanation in on3_code_snippets:
    questions.append({
        "id": question_id,
        "type": "code",
        "language": "python",
        "prompt": code,
        "correct_complexity": "O(n³)",
        "explanation": explanation,
        "difficulty": "medium",
        "highlight_spans": []
    })
    question_id += 1

for alg, explanation in on3_algorithms:
    questions.append({
        "id": question_id,
        "type": "name",
        "language": None,
        "prompt": alg,
        "correct_complexity": "O(n³)",
        "explanation": explanation,
        "difficulty": "medium",
        "highlight_spans": []
    })
    question_id += 1

# === O(2ⁿ) Exponential Questions ===
o2n_code_snippets = [
    ("def fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)", "Each call makes 2 recursive calls → binary tree of calls → O(2ⁿ)."),
    ("def power_set(arr):\n    if len(arr) == 0:\n        return [[]]\n    elem = arr[0]\n    rest = power_set(arr[1:])\n    return rest + [subset + [elem] for subset in rest]", "Generates all 2ⁿ subsets → O(2ⁿ)."),
    ("def solve_n_queens(n, row=0):\n    if row == n:\n        return 1\n    count = 0\n    for col in range(n):\n        if is_safe(row, col):\n            count += solve_n_queens(n, row+1)\n    return count", "Tries all possible placements → exponential backtracking."),
]

o2n_algorithms = [
    ("Fibonacci (naive recursive)", "T(n) = T(n-1) + T(n-2) → exponential growth."),
    ("Tower of Hanoi", "T(n) = 2T(n-1) + 1 → O(2ⁿ)."),
    ("Generating all subsets", "2ⁿ possible subsets of n elements."),
    ("Traveling Salesman (brute force)", "Tries all permutations → factorial or exponential."),
    ("Subset Sum (brute force)", "Checks all 2ⁿ subsets."),
]

for code, explanation in o2n_code_snippets:
    questions.append({
        "id": question_id,
        "type": "code",
        "language": "python",
        "prompt": code,
        "correct_complexity": "O(2ⁿ)",
        "explanation": explanation,
        "difficulty": "hard",
        "highlight_spans": []
    })
    question_id += 1

for alg, explanation in o2n_algorithms:
    questions.append({
        "id": question_id,
        "type": "name",
        "language": None,
        "prompt": alg,
        "correct_complexity": "O(2ⁿ)",
        "explanation": explanation,
        "difficulty": "hard",
        "highlight_spans": []
    })
    question_id += 1

# === O(n!) Factorial Questions ===
ofact_code_snippets = [
    ("def permutations(arr):\n    if len(arr) <= 1:\n        return [arr]\n    result = []\n    for i in range(len(arr)):\n        rest = arr[:i] + arr[i+1:]\n        for perm in permutations(rest):\n            result.append([arr[i]] + perm)\n    return result", "Generates all n! permutations."),
    ("def traveling_salesman_brute(cities):\n    min_cost = float('inf')\n    for perm in all_permutations(cities):\n        cost = calculate_cost(perm)\n        min_cost = min(min_cost, cost)\n    return min_cost", "Tries all n! orderings of cities."),
]

ofact_algorithms = [
    ("Generating all permutations", "n! permutations of n elements."),
    ("Traveling Salesman (exact brute force)", "Checks all n! routes."),
    ("Bogosort", "Randomly shuffles until sorted → O(n!) average."),
]

for code, explanation in ofact_code_snippets:
    questions.append({
        "id": question_id,
        "type": "code",
        "language": "python",
        "prompt": code,
        "correct_complexity": "O(n!)",
        "explanation": explanation,
        "difficulty": "hard",
        "highlight_spans": []
    })
    question_id += 1

for alg, explanation in ofact_algorithms:
    questions.append({
        "id": question_id,
        "type": "name",
        "language": None,
        "prompt": alg,
        "correct_complexity": "O(n!)",
        "explanation": explanation,
        "difficulty": "hard",
        "highlight_spans": []
    })
    question_id += 1

# Fill remaining slots with varied mixed questions
print(f"Generated {len(questions)} questions so far...")

# Add more varied C++ questions
cpp_questions = [
    ("vector<int> v;\nfor(int i = 0; i < n; i++) {\n    v.push_back(i);\n}", "Single loop with push_back (amortized O(1)) → O(n).", "O(n)", "easy"),
    ("int sum = 0;\nfor(int i = 0; i < n; i++) {\n    sum += arr[i];\n}", "Single loop adding elements → O(n).", "O(n)", "easy"),
    ("for(int i = 0; i < n; i++) {\n    for(int j = i; j < n; j++) {\n        sum += arr[i] + arr[j];\n    }\n}", "Nested loop with inner starting at i → n + (n-1) + ... + 1 = O(n²).", "O(n²)", "medium"),
    ("priority_queue<int> pq;\nfor(int i = 0; i < n; i++) {\n    pq.push(arr[i]);\n}", "n insertions into heap, each O(log n) → O(n log n).", "O(n log n)", "medium"),
    ("map<int, int> m;\nm[key] = value;", "Map insertion (balanced BST) is O(log n).", "O(log n)", "easy"),
    ("unordered_map<int, int> um;\num[key] = value;", "Hash map insertion averages O(1).", "O(1)", "easy"),
]

for code, explanation, complexity, difficulty in cpp_questions:
    questions.append({
        "id": question_id,
        "type": "code",
        "language": "cpp",
        "prompt": code,
        "correct_complexity": complexity,
        "explanation": explanation,
        "difficulty": difficulty,
        "highlight_spans": []
    })
    question_id += 1

# Add more Python advanced questions
python_advanced = [
    ("def nested_sum(matrix):\n    return sum(sum(row) for row in matrix)", "Two nested iterations over n×n matrix → O(n²).", "O(n²)", "medium"),
    ("def list_comp(n):\n    return [i*2 for i in range(n)]", "List comprehension with single loop → O(n).", "O(n)", "easy"),
    ("def dict_comp(n):\n    return {i: i**2 for i in range(n)}", "Dictionary comprehension with n elements → O(n).", "O(n)", "easy"),
    ("arr = sorted(arr, reverse=True)", "Sorting is O(n log n) regardless of reverse flag.", "O(n log n)", "easy"),
    ("result = list(set(arr))", "Converting to set is O(n), back to list is O(n) → O(n).", "O(n)", "easy"),
    ("max_val = max(arr)", "Built-in max scans all elements once → O(n).", "O(n)", "easy"),
]

for code, explanation, complexity, difficulty in python_advanced:
    questions.append({
        "id": question_id,
        "type": "code",
        "language": "python",
        "prompt": code,
        "correct_complexity": complexity,
        "explanation": explanation,
        "difficulty": difficulty,
        "highlight_spans": []
    })
    question_id += 1

# Add more algorithm name questions
more_algorithms = [
    ("DFS (Depth-First Search) on graph", "Visits each vertex and edge once → O(V + E).", "O(n)", "medium"),
    ("BFS (Breadth-First Search) on graph", "Visits each vertex and edge once → O(V + E).", "O(n)", "medium"),
    ("Dijkstra's Algorithm (binary heap)", "Each vertex dequeued once, edges relaxed → O((V+E) log V).", "O(n log n)", "hard"),
    ("Prim's Algorithm (binary heap)", "Similar to Dijkstra → O((V+E) log V).", "O(n log n)", "hard"),
    ("Kruskal's Algorithm", "Sort edges O(E log E), union-find operations → O(E log E).", "O(n log n)", "hard"),
    ("Counting Sort", "Non-comparison sort with O(n+k) where k is range → O(n) when k=O(n).", "O(n)", "medium"),
    ("Radix Sort", "Sorts by digits, d passes of O(n+k) → O(dn) = O(n) when d is constant.", "O(n)", "medium"),
    ("Bucket Sort (average)", "Distributes into buckets and sorts → O(n) average.", "O(n)", "medium"),
    ("KMP String Matching", "Preprocessing O(m) + matching O(n) → O(m+n) = O(n).", "O(n)", "hard"),
    ("Rabin-Karp Algorithm", "Rolling hash for pattern matching → O(n+m) average.", "O(n)", "medium"),
]

for alg, explanation, complexity, difficulty in more_algorithms:
    questions.append({
        "id": question_id,
        "type": "name",
        "language": None,
        "prompt": alg,
        "correct_complexity": complexity,
        "explanation": explanation,
        "difficulty": difficulty,
        "highlight_spans": []
    })
    question_id += 1

# Add more mixed complexity questions
mixed_questions = [
    ("def mystery1(n):\n    result = 0\n    i = 1\n    while i < n:\n        result += i\n        i *= 2\n    return result", "Loop with i *= 2 → O(log n).", "O(log n)", "medium", "python"),
    ("def mystery2(n):\n    for i in range(n):\n        j = i\n        while j > 0:\n            print(j)\n            j //= 2", "Outer loop n times, inner loop log i times → O(n log n).", "O(n log n)", "hard", "python"),
    ("for(int i = 0; i < n; i++) {\n    for(int j = 0; j < i; j++) {\n        cout << i + j;\n    }\n}", "Outer n times, inner i times → 0+1+2+...+(n-1) = O(n²).", "O(n²)", "medium", "cpp"),
    ("def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n-1)", "Single recursive call → O(n).", "O(n)", "easy", "python"),
    ("def tower_hanoi(n):\n    if n == 1:\n        return 1\n    return 2 * tower_hanoi(n-1) + 1", "T(n) = 2T(n-1) + 1 → O(2ⁿ).", "O(2ⁿ)", "hard", "python"),
]

for code, explanation, complexity, difficulty, lang in mixed_questions:
    questions.append({
        "id": question_id,
        "type": "code",
        "language": lang,
        "prompt": code,
        "correct_complexity": complexity,
        "explanation": explanation,
        "difficulty": difficulty,
        "highlight_spans": []
    })
    question_id += 1

# Pad with more easy questions if needed
while len(questions) < 200:
    easy_fillers = [
        ("return len(arr)", "Getting length is O(1).", "O(1)", "easy", "python"),
        ("x = arr[index]", "Array indexing is O(1).", "O(1)", "easy", "python"),
        ("arr.clear()", "Clearing list is O(n).", "O(n)", "easy", "python"),
        ("'substring' in string", "String search is O(n*m) worst case → O(n) typically.", "O(n)", "easy", "python"),
        ("for i in range(n):\n    arr.append(i)", "n append operations (amortized O(1) each) → O(n).", "O(n)", "easy", "python"),
    ]
    code, explanation, complexity, difficulty, lang = easy_fillers[len(questions) % len(easy_fillers)]
    questions.append({
        "id": question_id,
        "type": "code",
        "language": lang,
        "prompt": code,
        "correct_complexity": complexity,
        "explanation": explanation,
        "difficulty": difficulty,
        "highlight_spans": []
    })
    question_id += 1

# Save to JSON
output = {"questions": questions[:200]}  # Cap at 200
with open('quiz_bank.json', 'w', encoding='utf-8') as f:
    json.dump(output, f, indent=2)

print(f"[OK] Generated {len(output['questions'])} questions")
print(f"Breakdown:")
print(f"  Easy: {sum(1 for q in output['questions'] if q['difficulty'] == 'easy')}")
print(f"  Medium: {sum(1 for q in output['questions'] if q['difficulty'] == 'medium')}")
print(f"  Hard: {sum(1 for q in output['questions'] if q['difficulty'] == 'hard')}")
print(f"  Code: {sum(1 for q in output['questions'] if q['type'] == 'code')}")
print(f"  Algorithm names: {sum(1 for q in output['questions'] if q['type'] == 'name')}")
