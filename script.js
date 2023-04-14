let Foods = [
	[], // monday
	[], // tuesday
	[], // wednesday
	[], // thursday
	[], // friday
	[], // saturday
	[], // sunday
];
let tableHeight = 0;
const inEdit = {
	day: null,
	foodIndex: null,
};
const foodInput = document.getElementById('food');
const form = document.getElementById('form');
const tableHeader = `
<header class="grid gap-[2px] border-b-2 border-red-800 grid-cols-7 ">
	<h1 class="text-center bg-red-300 p-1">Segunda</h1>
	<h1 class="text-center bg-red-300 p-1">Terça</h1>
	<h1 class="text-center bg-red-300 p-1">Quarta</h1>
	<h1 class="text-center bg-red-300 p-1">Quinta</h1>
	<h1 class="text-center bg-red-300 p-1">Sexta</h1>
	<h1 class="text-center bg-red-300 p-1">Sábado</h1>
	<h1 class="text-center bg-red-300 p-1">Domingo</h1>
</header>`;

load();
renderFoods();

form.addEventListener('submit', (e) => {
	e.preventDefault();
});

foodInput.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		const day = document.getElementById('day').value;
		const food = foodInput.value;
		Foods[day].push(food);

		calculateTableHeight();
		renderFoods();
	}
});

function renderFoods() {
	calculateTableHeight();
	const table = document.getElementById('table');
	table.innerHTML = tableHeader;

	const row = document.createElement('div');
	row.classList.add('grid', 'gap-[2px]', 'grid-cols-7');

	for (let i = 0; i < tableHeight; i++) {
		Foods.forEach((day, dayIndex) => {
			const food = document.createElement('div');
			food.classList.add('flex', 'justify-between', 'text-center', 'bg-red-100', 'p-1');
			if (day[i] === undefined) {
				food.innerHTML = '';
			} else if (dayIndex === inEdit.day && i === inEdit.foodIndex) {
				food.innerHTML = `
				<button onclick="deleteFood(${dayIndex}, ${i})" class="hover:bg-black/20">
						<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
							<path d="M0 0h24v24H0z" fill="none" />
							<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
						</svg>
					</button>
				<input class="w-full text-center px-1" id="edit" type="text" value="${day[i]}" />
				<button class="hover:bg-black/20">
						<svg onclick="editFoodSave(${dayIndex}, ${i})" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
							<path d="M0 0h24v24H0z" fill="none" />
							<path
								d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
						</svg>
					</button>
				</div>
				`;
			} else {
				food.innerHTML = `
				<button onclick="deleteFood(${dayIndex}, ${i})" class="hover:bg-black/20">
						<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
							<path d="M0 0h24v24H0z" fill="none" />
							<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
						</svg>
					</button>
				${day[i]}
				<button onclick="editFood(${dayIndex}, ${i})" class="hover:bg-black/20">
						<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
							<path d="M0 0h24v24H0z" fill="none" />
							<path
								d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
						</svg>
					</button>
				</div>
				`;
			}

			row.appendChild(food);
		});
	}
	table.appendChild(row);
	save();
}

function calculateTableHeight() {
	tableHeight = 0;
	Foods.forEach((day) => {
		tableHeight = day.length > tableHeight ? day.length : tableHeight;
	});
}

function deleteFood(day, foodIndex) {
	Foods[day].splice(foodIndex, 1);
	renderFoods();
}

function editFood(day, foodIndex) {
	inEdit.day = day;
	inEdit.foodIndex = foodIndex;
	renderFoods();
	document.getElementById('edit').focus();
}

function editFoodSave(day, foodIndex) {
	Foods[day][foodIndex] = document.getElementById('edit').value;
	inEdit.day = null;
	inEdit.foodIndex = null;
	renderFoods();
}

function save() {
	const json = JSON.stringify(Foods);
	localStorage.setItem('foods', json);
}

function load() {
	const json = localStorage.getItem('foods');
	if (json) {
		Foods = JSON.parse(json);
		calculateTableHeight();
		renderFoods();
	}
}
