const app = Vue.createApp({
    data() {
        return {
            Frontpage: true,
            Elprispage: false,
            Page1: false,
            Page2: false,
            Userpage: false,
            PieData: [],
            PieData2: [],
            ElPriser: [],
            Timer: [],
            LineData: [],
            CurrentValue: "",
            ValueChange: 0,
            Apartment: {
                AId: 1,
                PowerUsedLastMonth: 900,
                PowerUsedCurrentMonth: 280,
                CId: 1,
                BId: 1,
            },
            Block: {
                BId: 1,
                PowerUsedLastMonth: 8604,
                PowerUsedCurrentMonth: 3174,
                PowerGenerated: null,
                CId: 1
            },
            Community: {
                CId: 1,
                PowerUsedLastMonth: 30346,
                PowerUsedCurrentMonth: 12964,
                PowerGenerated: null
            }
        }
    },
    created(){
        const randomnum = this.getRandomIntInclusive(20, 28)
        const StartValue = randomnum/10
        for (let i = 0; i < 24; i++) {
            const NewDate = new Date()
            const temp = NewDate.getHours()
            NewDate.setHours(temp-23+i)
            const Hour = NewDate.getHours()
            const HourPlus = NewDate.getHours()+1
            const HourRange = Hour + "‒" + HourPlus
            this.Timer.push(HourRange)

            const randomnum = this.getRandomIntInclusive(-10, 10)
            this.ValueChange += randomnum/10
            if (StartValue + this.ValueChange > 3.8){
                this.ValueChange = 3.8 - StartValue
            }
            else if (StartValue + this.ValueChange <= 1.3){
                this.ValueChange = 1.3 - StartValue
            }

            this.ElPriser.push(StartValue + this.ValueChange)
            this.CurrentValue = (StartValue + this.ValueChange).toFixed(1)

        }
        console.log(this.Timer)
        this.PieData.push(
            {
                labels: ["You", "Rest of the Block"],
                values: [this.Apartment.PowerUsedCurrentMonth, this.Block.PowerUsedCurrentMonth],
                type: "pie"
            }
        )
        this.PieData2.push(
            {
                labels: ["You", "Rest of the Community"],
                values: [this.Apartment.PowerUsedCurrentMonth, this.Community.PowerUsedCurrentMonth],
                type: "pie"
            }
        )
        this.LineData.push(
            {
                x: this.Timer,
                y: this.ElPriser,
                mode: "lines",
                type: "scatter"
            }
        )
    },
    methods: {
        IntoFrontpage(){
            this.Frontpage = true,
            this.Elprispage = false,
            this.Page1 = false,
            this.Page2 = false,
            this.Userpage = false
        },
        IntoElprispage(){
            this.Frontpage = false,
            this.Elprispage = true,
            this.Page1 = false,
            this.Page2 = false,
            this.Userpage = false
            setTimeout(function() { document.getElementById("LineBTN").click(); }, 1);
        },
        IntoPage1(){
            this.Frontpage = false,
            this.Elprispage = false,
            this.Page1 = true,
            this.Page2 = false,
            this.Userpage = false
            setTimeout(function() { document.getElementById("PieBTN").click(); }, 1);
        },
        IntoPage2(){
            this.Frontpage = false,
            this.Elprispage = false,
            this.Page1 = false,
            this.Page2 = true,
            this.Userpage = false
        },
        IntoUserpage(){
            this.Frontpage = false,
            this.Elprispage = false,
            this.Page1 = false,
            this.Page2 = false,
            this.Userpage = true
        },
        Pie(){
            Plotly.newPlot("pieChart", this.PieData)
            Plotly.newPlot("pieChart2", this.PieData2)
        },
        Line(){
            Plotly.newPlot("lineChart", this.LineData, {
                title: "Elpriser for sidste 24 timer",
                xaxis:{
                    title: "Timeinterval"
                },
                yaxis:{
                    title: "kr./kWh"
                }
            })
        },
        getRandomIntInclusive(min, max) {
            min = Math.ceil(min)
            max = Math.floor(max)
            return Math.floor(Math.random() * (max - min + 1) + min)
          }
    }
})