let myChart = null;
let patients = [];
const base64Credentials = btoa("coalition:skills-test");

fetch("https://fedskillstest.coalitiontechnologies.workers.dev", {
    method: "GET",
    headers: {
        Authorization: ` Basic ${base64Credentials}`,
        "Content-Type": "application/json",
    },
})
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        patients.push(...data);
        getData()
        findUsers()
        

    })
    .catch((error) => console.error("Error:", error));
const patiensList = document.getElementById("patients")
function getData() {
    patients.forEach(function (item) {
        patiensList.innerHTML +=
            `<div  class="flex gap-2">
            <img width="40px" src="${item.profile_picture}" />
            <div>
                <p class="text-base">${item.name}</p>
                <p class="text-sm text-[#707070]">${item.gender}, ${item.age}</p>
            </div>                        
        </div>`
    })
}

const userParameters = document.getElementById("userParameters")
const diagnosticList = document.getElementById("diagnosticList")
const lbRes = document.getElementById("labResults")
const analyz = document.getElementById("analyz")
const syscValue = document.getElementById("syscValue")
const syscLevel = document.getElementById("syscLevel")
const dyscValue = document.getElementById("dyscValue")
const dyscLevel = document.getElementById("dyscLevel")
const resp = document.getElementById("respiratory")
const temp = document.getElementById("temp")
const heart = document.getElementById("heart")
const respLevel = document.getElementById("resp-level")
const tempLevel = document.getElementById("temp-level")
const heartLevel = document.getElementById("heart-level")
function usersParams(arg) {
    userParameters.innerHTML = ''
    lbRes.innerHTML = ''
    diagnosticList.innerHTML = '' 
    
    let filteredItem = patients.filter((item, index) => (index === arg))

    userParameters.innerHTML += `
                   <div class="flex justify-center items-center">
                       <img width="200px" src="${filteredItem[0].profile_picture}" alt="">
                   </div>
                   <h2 class="font-bold text-2xl flex justify-center items-center">${filteredItem[0].name}</h2>
                   <div class="flex flex-col gap-7">
                       <div class="flex gap-2 items-center w-full ">
                           <img src="img/BirthIcon.png" alt="">
                           <div >
                               <p>Date of birth</p>
                               <p>${filteredItem[0].date_of_birth}</p>
                           </div>
                       </div>
                       <div class="flex gap-2 items-center">
                           <img src="img/FemaleIcon.png" alt="">
                           <div>
                               <p>Gender</p>
                               <p>${filteredItem[0].gender}</p>
                           </div>
                       </div>
                       <div class="flex gap-2 items-center">
                           <img src="img/PhoneIcon.png" alt="">
                           <div>
                               <p>Contact Info.</p>
                               <p>${filteredItem[0].phone_number}</p>
                           </div>
                       </div>
                       <div class="flex gap-2 items-center">
                           <img src="img/PhoneIcon.png" alt="">
                           <div>
                               <p> Emergency contact</p>
                               <p>${filteredItem[0].emergency_contact}</p>
                           </div>
                       </div>
                       <div class="flex gap-2 items-center">
                           <img src="img/InsuranceIcon.png" alt="">
                           <div>
                               <p>Insurance Provider</p>
                               <p>${filteredItem[0].insurance_type}</p>
                           </div>
                       </div>
                       <button class="p-3 bg-[#01F0D0] rounded-full font-bold">Show All Information</button>
                   </div>
                   `

            filteredItem[0].lab_results.map(item => {
                lbRes.innerHTML += 
                `
                <div class="flex justify-between">
                    <p>${item}</p>
                    <i class="fa-solid fa-download text-xl"></i>
                </div>
            
               `
            })


            filteredItem[0].diagnostic_list.map(item => {
            
            diagnosticList.innerHTML += 
            `
             <div class="flex justify-between text-center my-4 px-2">
                 <p>${item.name}</p>
                 <p>${item.description}</p>
                 <p>${item.status}</p>
                 </div>
                 <hr />
            `
         })

         filteredItem[0].diagnosis_history.map( item => {

             syscLevel.innerHTML = item.blood_pressure.systolic.levels
             dyscLevel.innerHTML = item.blood_pressure.diastolic.levels
             
                
                respLevel.innerHTML = item.respiratory_rate.levels
                tempLevel.innerHTML = item.temperature.levels 
                heartLevel.innerHTML = item.heart_rate.levels 
            })

                let syscMapValue =  filteredItem[0].diagnosis_history.map(item => item.blood_pressure.systolic.value);
                let dyscMapValue =  filteredItem[0].diagnosis_history.map(item => item.blood_pressure.diastolic.value);
                let heartSum =  filteredItem[0].diagnosis_history.map(item => item.heart_rate.value);
                let respSum =  filteredItem[0].diagnosis_history.map(item => item.respiratory_rate.value);
                let tempSum =  filteredItem[0].diagnosis_history.map(item => item.temperature.value);
                
                
            let syscSum = 0
            syscMapValue.forEach( item => {
                syscSum += item
            })
            let dyscSum = 0
            dyscMapValue.forEach( item => {
                dyscSum += item
            })
            


                let sum = 0;

                tempSum.forEach(element => {
               sum += element
           });

           let cem = 0

            respSum.forEach( elem => {
            cem += elem
            })

           let aliye = 0

            heartSum.forEach( elem => {
            aliye += elem
            })

            syscValue.innerHTML = Math.round(syscSum / filteredItem[0].diagnosis_history.length)
            dyscValue.innerHTML = Math.round(dyscSum / filteredItem[0].diagnosis_history.length)
           temp.innerHTML = (sum / filteredItem[0].diagnosis_history.length).toFixed(1) + ' °F'
           resp.innerHTML = Math.round(cem / filteredItem[0].diagnosis_history.length) + ' bpm'
           heart.innerHTML = Math.round(aliye / filteredItem[0].diagnosis_history.length) + ' bpm'

           
          
            myChart.data.datasets[0].data = dyscMapValue
            myChart.data.datasets[1].data = syscMapValue
            myChart.update();




}





const usersSearch = document.getElementById("usersSearch")
const patientsTitle = document.getElementById("patients-title")

function searchBar() {
    usersSearch.classList.toggle("hidden")
    patientsTitle.classList.toggle("hidden")
}
console.log(patients)
function findUsers() {
    patiensList.innerHTML = ''
    patients.forEach((item, i) => {
        if (item.name.toLowerCase().includes(usersSearch.value)) {
            patiensList.innerHTML +=
                `<div onclick="usersParams(${i})" class="flex gap-2 rounded-xl p-3 users">
                    <img width="40px" src="${item.profile_picture}" />
                <div>
                    <p class="text-base">${item.name}</p>
                    <p class="text-sm text-[#707070]">${item.gender}, ${item.age}</p>
                </div>                        
            </div>`



        }
    })
}


const ctx = document.getElementById('myChart');

function tap(){
    patients.forEach( item => {
        item.diagnosis_history.map( elem => {
            console.log(elem);
        })
    })
}
document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Oct, 2023', 'Nov, 2023', 'Dec, 2023', 'Jan, 2024', 'Feb, 2024', 'Mar, 2024'],
        datasets: [
          {
            label: 'Heart Rate',
            data: [95, 120, 77, 92, 95, 80, 68, 70, 95], // Default initial data for heart rate
            borderWidth: 4,
            borderColor: '#7E6CAB',
            pointRadius: 10,
            pointBackgroundColor: '#7E6CAB',
            pointBorderWidth: 1,
            pointBorderColor: '#fff',
            tension: 0.5
          },
          {
            label: 'Temperature',
            data: [ 163, 151, 168, 158, 117, 115, 133, 149, 165], // Default initial data for temperature
            borderWidth: 4,
            borderColor: '#C26EB4',
            pointRadius: 10,
            pointBackgroundColor: '#E66FD2',
            pointBorderWidth: 1,
            pointBorderColor: '#fff',
            tension: 0.5
          }
        ]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            beginAtZero: false,
            grid: {
              display: false
            }
          }
        }
      }
    });
  });