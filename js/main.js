const navBtn = document.querySelectorAll('.nav__btn')
const popup = document.querySelector('.popup')
const addBtn = document.querySelector('.add__btn')
const dataAdd = document.querySelectorAll('.data-add')
let newItem = {}
// GOOD Адрес базы данных
const baseUrl = 'https://69066b9bee3d0d14c135c505.mockapi.io/estimate'

// GOOD Действия при старте
document.addEventListener('DOMContentLoaded', () => {
	getQuestion()
})

// GOOD Функция получения всех данных с сервера и запуск формирования списка объектов (постов) охраны
function getQuestion() {
	fetch(baseUrl, {
		method: 'GET',
		headers: { 'content-type': 'application/json' },
	})
		.then(response => response.json())
		.then(dataGet => datasetRender(dataGet))
		.catch(error => console.error(error))
}

// GOOD Список объектов (постов) охраны в базе формирование
function datasetRender(dataGet) {
	document.querySelector('.dataset__table').innerHTML = ''

	let headRow = document.createElement('tr')
	headRow.innerHTML = `
        <th>#</th>
		<th>Объект (пост) охраны</th>
		<th>Адрес</th>
		<th>Контактное лицо</th>
		<th>Телефон</th>
		<th>Примечания</th>
		<th>УДАЛИТЬ</th>
    `
	document.querySelector('.dataset__table').append(headRow)

	dataGet.forEach(function (item) {
		let row = document.createElement('tr')
		row.innerHTML = `
        <td>${item.id}</td>
		<td>${item.objName}</td>
		<td>${item.objAddress}</td>
		<td>${item.objRespPerson}</td>
		<td>${item.objRespPersonTel}</td>
		<td>${item.objNote}</td>
		<td><button class="del__btn">УДАЛИТЬ</button></td>
	`
		document.querySelector('.dataset__table').append(row)
	})
}

// -GOOD Запись нового объекта и сметы по нему (формирование данных для передачи на сервер)
addBtn.addEventListener('click', function () {
	newItem = {
		objName: document.getElementById('objName').value,
		objAddress: document.getElementById('objAddress').value,
		objRespPerson: document.getElementById('objRespPerson').value,
		objRespPersonTel: document.getElementById('objRespPersonTel').value,

		GuardNum: document.getElementById('GuardNum').value,
		GuardSalary: document.getElementById('GuardSalary').value,
		GuardSoc: document.getElementById('GuardSoc').value,
		aup: document.getElementById('AUP').value,
		tel: document.getElementById('tel').value,
		stationery: document.getElementById('stationery').value,
		other: document.getElementById('other').value,

		sanFac: document.getElementById('sanFac').value,
		uniformWinter: document.getElementById('uniformWinter').value,
		uniformSummer: document.getElementById('uniformSummer').value,
		specialTools: document.getElementById('specialTools').value,
		documentation: document.getElementById('documentation').value,
		adsVacancy: document.getElementById('adsVacancy').value,
		telTools: document.getElementById('telTools').value,
		profit: document.getElementById('profit').value,
		tax: document.getElementById('tax').value,

		salaryBranch: document.getElementById('salaryBranch').value,
		salaryChart: document.getElementById('salaryChart').value,
		objNote: document.getElementById('objNote').value,
	}
	console.log(newItem)

	postQuestions(newItem)
	dataAdd.forEach(dataAdd => {
		dataAdd.value = ''
		getQuestion()
	})

	document.querySelector('.popup__add').classList.remove('popup__add-active')
	document.querySelector('.popup').classList.remove('popup-active')
	getQuestion()
})

// GOOD Отправка данных по новому объекту и смете на него на сервер
function postQuestions(newItem) {
	fetch(baseUrl, {
		method: 'POST',
		body: JSON.stringify(newItem),
		headers: { 'content-type': 'application/json' },
	})
	.then(console.log(newItem))
		.then(response => response.json())
		.catch(error => console.error(error))
}

// GOOD Удаление выбранного контрагента
let datasetTable = document.querySelector('.dataset__table')

datasetTable.addEventListener('click', function (e) {
	if (e.target.tagName === 'BUTTON') {
		let url =
			baseUrl + '/' + e.target.parentNode.parentNode.childNodes[1].innerHTML
		// console.log(e.target.tagName);
		// console.log(url)

		fetch(url, {
			method: 'DELETE',
		})
			.then(res => {
				if (res.ok) {
					getQuestion()
					return res.json()
				}
			})
			.catch(error => console.error(error))
	}
})

// GOOD Закрытие окна карточки ввода данных по объекту при нажатии на "Закрыть"
popup.addEventListener('click', e => {
	if (e.target.classList.contains('add__close')) {
		document.querySelector('.popup__add').classList.remove('popup__add-active')
		popup.classList.remove('popup-active')
		getQuestion()
	}
})

// GOOD Закрытие всплывающего окна со сметой при нажатии на кнопку "закрыть"
document.querySelector('.popup-card').addEventListener('click', e => {
	if (e.target.classList.contains('card__close')) {
		document.querySelector('.popup-card').classList.remove('popup-active')
		document.querySelector('.card').classList.remove('card-active')

		getQuestion()
	}
})

// GOOD
navBtn.forEach(item => {
	item.addEventListener('click', function (e) {
		e.preventDefault()
		popup.classList.add('popup-active')
		if (item.classList.contains('nav__btn-add')) {
			document.querySelector('.popup__add').classList.add('popup__add-active')
		}
	})
})

// GOOD Получение с сервера данных по смете выбранного объекта (при нажатие на строку в таблице списка)
datasetTable.addEventListener('click', function (e) {
	if (e.target.tagName === 'TD') {
		let urlCard = baseUrl + '/' + e.target.parentNode.childNodes[1].innerHTML

		getQuestionCard()

		function getQuestionCard() {
			fetch(urlCard, {
				method: 'GET',
				headers: { 'content-type': 'application/json' },
			})
				.then(response => response.json())

				.then(dataGetCard => datasetRenderCard(dataGetCard))

				.catch(error => console.error(error))
		}
	}
})

// Формирование сметы по выбранному объекту
function datasetRenderCard(dataGetCard) {
	document.querySelector('.popup-card').classList.add('popup-active')
	document.querySelector('.card').classList.add('card-active')

	document.querySelector('.obj__name').innerHTML = `
	Наименование объекта (поста) охраны: ${dataGetCard.objName}
	`
	document.querySelector('.obj__address').innerHTML = `
	Адрес объекта (поста) охраны: ${dataGetCard.objAddress}
	`
	document.querySelector('.guard__num').innerHTML = `
	Число охранников объекта (поста): ${dataGetCard.GuardNum}
	`
	document.querySelector('.salary__branch').innerHTML = `
	Справочно: реальная ЗП по отрасли, с учетом конъюнктуры рынка (на 1 сотрудника работа по графику «вахта 15х15)  в месяц: ${dataGetCard.salaryBranch}
	`
	document.querySelector('.salary__chart').innerHTML = `
	Справочно: реальная заработная плата по отрасли, с учетом конъюнктуры рынка (на 1 сотрудника работа по графику «сутки-двое, Два-четыре и т.д.) в месяц: ${dataGetCard.salaryChart}
	`

	document.querySelector('.dataset__table-card').innerHTML = ''

	let headRow = document.createElement('tr')
	headRow.innerHTML = `
        <th>Статья расходов и затрат</th>
		<th>Сумма в месяц</th>
		<th>Сумма в год</th>
    `
	document.querySelector('.dataset__table-card').append(headRow)

	let row1 = document.createElement('tr')
	let row2 = document.createElement('tr')
	let row3 = document.createElement('tr')
	let row4 = document.createElement('tr')
	let row5 = document.createElement('tr')
	let row6 = document.createElement('tr')
	let row7 = document.createElement('tr')
	let row8 = document.createElement('tr')
	let row9 = document.createElement('tr')
	let row10 = document.createElement('tr')
	let row11 = document.createElement('tr')
	let row12 = document.createElement('tr')
	let row13 = document.createElement('tr')
	let row14 = document.createElement('tr')
	let row15 = document.createElement('tr')
	let row16 = document.createElement('tr')

	row1.classList.add("estimate")
	row2.classList.add("estimate")
	row3.classList.add("estimate")
	row4.classList.add("estimate")
	row5.classList.add("estimate")
	row6.classList.add("estimate")
	row7.classList.add("estimate")
	row8.classList.add("estimate")
	row9.classList.add("estimate")
	row10.classList.add("estimate")
	row11.classList.add("estimate")
	row12.classList.add("estimate")
	row13.classList.add("estimate")
	row14.classList.add("estimate")
	row15.classList.add("estimate")
	row16.classList.add("estimate")
	row16.classList.add("estimate__total")

	let varCost = (dataGetCard.GuardNum * dataGetCard.GuardSalary*12 + dataGetCard.GuardNum * dataGetCard.GuardSalary*(dataGetCard.GuardSoc / 100)*12 + dataGetCard.aup*12 + dataGetCard.tel*12 + dataGetCard.stationery*12 + dataGetCard.other*12)

	let fixedCost = (+dataGetCard.sanFac + (dataGetCard.GuardNum * dataGetCard.uniformWinter) + (dataGetCard.GuardNum * dataGetCard.uniformSummer) + (+dataGetCard.specialTools) + (+dataGetCard.documentation) + (+dataGetCard.adsVacancy) + (+dataGetCard.telTools))

	row1.innerHTML = `
       	<td>Зарплата охранникам с учетом повышения МРОТ</td>
		<td>${(dataGetCard.GuardNum * dataGetCard.GuardSalary).toFixed(2)}</td>
		<td>${(dataGetCard.GuardNum * dataGetCard.GuardSalary * 12).toFixed(2)}</td>
	`
	row2.innerHTML = `
       	<td>Отчисления на соц.страхование и обеспечение</td>
		<td>${
			(dataGetCard.GuardNum *
			dataGetCard.GuardSalary *
			(dataGetCard.GuardSoc / 100)).toFixed(2)
		}</td>
		<td>${
			(((dataGetCard.GuardNum * dataGetCard.GuardSalary) / 100) *
			dataGetCard.GuardSoc *
			12).toFixed(2)
		}</td>
	`
		row3.innerHTML = `
       	<td>Содержание АУП контроля над объектом</td>
		<td>${
			(dataGetCard.aup*1).toFixed(2)
		}</td>
		<td>${
			(dataGetCard.aup *
			12).toFixed(2)}</td>
	`
	row4.innerHTML = `
       	<td>Расходы на моб.связь объекта</td>
		<td>${
			(dataGetCard.tel*1).toFixed(2)
		}</td>
		<td>${
			(dataGetCard.tel *
			12).toFixed(2)
		}</td>
	`
	row5.innerHTML = `
       	<td>Расходы на канцтовары</td>
		<td>${
			(dataGetCard.stationery*1).toFixed(2)
		}</td>
		<td>${
			(dataGetCard.stationery *
			12).toFixed(2)
		}</td>
	`
	row6.innerHTML = `
       	<td>Прочие расходы по объекту (посту) охраны</td>
		<td>${
			(dataGetCard.other*1).toFixed(2)
		}</td>
		<td>${
			(dataGetCard.other *
			12).toFixed(2)
		}</td>
	`
	row7.innerHTML = `
       	<td>Санитарно-бытовые расходы по объекту (посту)</td>
		<td>${
			(dataGetCard.sanFac/12).toFixed(2)
		}</td>
		<td>${(dataGetCard.sanFac*1).toFixed(2)}</td>
	`
	row8.innerHTML = `
       	<td>Обеспечение охранников форменной одеждой осенне-зимнего периода</td>
		<td>${(dataGetCard.GuardNum * dataGetCard.uniformWinter/12).toFixed(2)}</td>
		<td>${(dataGetCard.GuardNum * dataGetCard.uniformWinter).toFixed(2)}</td>
	`
	row9.innerHTML = `
       	<td>Обеспечение охранников форменной одеждой весенне-летнего периода</td>
		<td>${(dataGetCard.GuardNum * dataGetCard.uniformSummer/12).toFixed(2)}</td>
		<td>${(dataGetCard.GuardNum * dataGetCard.uniformSummer).toFixed(2)}</td>
	`
	row10.innerHTML = `
       	<td>Обеспечение объекта специальными средствами (металлодетекторы и т.д.)</td>
		<td>${(dataGetCard.specialTools/12).toFixed(2)}</td>
		<td>${(dataGetCard.specialTools*1).toFixed(2)}</td>
	`
	row11.innerHTML = `
       	<td>Обеспечение объекта книгами служебной документацией</td>
		<td>${(dataGetCard.documentation/12).toFixed(2)}</td>
		<td>${(dataGetCard.documentation*1).toFixed(2)}</td>
	`
	row12.innerHTML = `
       	<td>Расходы на объявления по вакансиям</td>
		<td>${(dataGetCard.adsVacancy/12).toFixed(2)}</td>
		<td>${(dataGetCard.adsVacancy*1).toFixed(2)}</td>
	`
	row13.innerHTML = `
       	<td>Обеспечение объекта (поста) средствами связи</td>
		<td>${(dataGetCard.telTools/12).toFixed(2)}</td>
		<td>${(dataGetCard.telTools*1).toFixed(2)}</td>
	`


	row14.innerHTML = `
       	<td>Прибыль</td>
		<td>${
			(((varCost + fixedCost) * (dataGetCard.profit/100))/12).toFixed(2)
		}</td>
		<td>${
			((varCost + fixedCost) * (dataGetCard.profit/100)).toFixed(2)
		}</td>
	`
	row15.innerHTML = `
       	<td>Налоги</td>
		<td>${
			(((varCost + fixedCost) * (1+dataGetCard.profit/100)*(dataGetCard.tax/100))/12).toFixed(2)
		}</td>
		<td>${
			((varCost + fixedCost) * (1+dataGetCard.profit/100)*(dataGetCard.tax/100)).toFixed(2)
		}</td>
	`
	row16.innerHTML = `
       	<td>ИТОГО ПО СМЕТЕ</td>
		<td>${
			(((varCost + fixedCost) * (1+dataGetCard.profit/100)*(1+dataGetCard.tax/100))/12).toFixed(2)
		}</td>
		<td>${
			((varCost + fixedCost) * (1+dataGetCard.profit/100)*(1+dataGetCard.tax/100)).toFixed(2)
		}</td>
	`

	document.querySelector('.dataset__table-card').append(row1)
	document.querySelector('.dataset__table-card').append(row2)
	document.querySelector('.dataset__table-card').append(row3)
	document.querySelector('.dataset__table-card').append(row4)
	document.querySelector('.dataset__table-card').append(row5)
	document.querySelector('.dataset__table-card').append(row6)
	document.querySelector('.dataset__table-card').append(row7)
	document.querySelector('.dataset__table-card').append(row8)
	document.querySelector('.dataset__table-card').append(row9)
	document.querySelector('.dataset__table-card').append(row10)
	document.querySelector('.dataset__table-card').append(row11)
	document.querySelector('.dataset__table-card').append(row12)
	document.querySelector('.dataset__table-card').append(row13)
	document.querySelector('.dataset__table-card').append(row14)
	document.querySelector('.dataset__table-card').append(row15)
	document.querySelector('.dataset__table-card').append(row16)
}