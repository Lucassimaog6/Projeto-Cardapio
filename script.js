const Foods = [
	[], // monday
	[], // tuesday
	[], // wednesday
	[], // thursday
	[], // friday
	[], // saturday
	[], // sunday
];

const foodInput = document.getElementById('food');
let tableHeight = 0;
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

foodInput.addEventListener('keydown', (e) => {
	e.preventDefault();
	if (e.key === 'Enter') {
		const day = document.getElementById('day').value;
		const food = foodInput.value;
		Foods[day].push(food);

		calculateTableHeight();
		renderFoods();
	}
});

function renderFoods() {
	const table = document.getElementById('table');
	table.innerHTML = tableHeader;

	const row = document.createElement('div');
	row.classList.add('grid', 'gap-[2px]', 'grid-cols-7');

	for (let i = 0; i < tableHeight; i++) {
		Foods.forEach((day, dayIndex) => {
			const food = document.createElement('div');
			food.classList.add('text-center', 'bg-red-100', 'p-1');
			food.innerHTML = `
			<div class="text-center bg-red-100 p-2 flex  justify-between">
			${
				day[i] === undefined
					? ''
					: `
			<button onclick="deleteFood(${dayIndex}, ${i})" class="hover:bg-black/20">
					<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
						<path d="M0 0h24v24H0z" fill="none" />
						<path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
					</svg>
				</button>
			${day[i]}
			<button class="hover:bg-black/20">
					<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
						<path d="M0 0h24v24H0z" fill="none" />
						<path
							d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
					</svg>
				</button>
			</div>
			`
			}
			`;

			row.appendChild(food);
		});
	}
	table.appendChild(row);
}

function calculateTableHeight() {
	tableHeight = 0;
	Foods.forEach((day) => {
		tableHeight = day.length > tableHeight ? day.length : tableHeight;
	});
}

function deleteFood(day, foodIndex) {
	Foods[day].splice(foodIndex, 1);
	calculateTableHeight();
	renderFoods();
}
