const myKey = 'dc6be4480cc118d8e566b7b73780141c'

// document.querySelector('.add').onclick = addCity


function createDiv(){
	target = document.querySelector('#target')


	let new_div = document.createElement('div')
	new_div.className = 'wather'
	new_div.style.trastion = 0.1 +'s' 
	let my_div = document.querySelector('.wather')

	let city = (new_div.appendChild(document.createElement('p'))).className = 'city-name'

	let gradus = (new_div.appendChild(document.createElement('p'))).className = 'gradus'

	let params = new_div.appendChild(document.createElement('div'))
	params.className = 'params'

	let icon = params.appendChild(document.createElement('p'))
	icon.className = 'icon'

	let de = params.appendChild(document.createElement('p'))
	de.className = 'description'
	
	let created_element = target.insertBefore(new_div, my_div)
}
document.querySelector('.bt').onclick = weather_data

// window.onload = weather_data(get_w(get_city()))

// function get_city(){
// 	let city
// 	if(localStorage.getItem('wather')!==null){
// 		city = localStorage.getItem('wather');
// 		city = JSON.parse(city)
// 		city =  city.name
// 	}
// }

function weather_data(){

	let city = document.querySelector('.inp').value
	fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myKey}`)
	.then(function(resp){
		console.log(resp.status)
		
		if(resp.status == '200'){
			createDiv()
		}
		else{
			alert('city not found')
		}
		return resp.json() })

	.then(function(data){
		console.log(data)
		let urlIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
		let item = {
			'name' : document.querySelector('.city-name').innerHTML = data.name,
			'temp' : document.querySelector('.gradus').innerHTML = Math.round( data.main.temp - 273) + '&deg;',
			'desc' : document.querySelector('.description').innerHTML = data.weather[0].description,
			'icon' : document.querySelector('.icon').innerHTML = `<img src="${urlIcon}">`
		}
		
		write(item)	
	})
}

function write(item){
	localStorage.setItem('wather', JSON.stringify(item))
	let ls = localStorage.getItem('wather')
	ls = JSON.parse(ls)
	console.log(ls)
}

function get_w(){
	if(localStorage.getItem('wather')!==null){
		let city = localStorage.getItem('wather');
		city = JSON.parse(city)
		return city.name
}
}