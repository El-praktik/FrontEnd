const app = Vue.createApp({
    data() {
        return {
            Frontpage: true,
            Elprispage: false,
            Page1: false,
            Page2: false,
            Userpage: false,
            ElmålerIds: [1, 2, 3],
            ElmålerVærdier: [56, 34, 19],
            PieData: [],
            ElPriser: [],
            Timer: [],
            LineData: [],
            CurrentDate: "",
            ValueChange: 0
        }
    },
    created(){
        const randomnum = this.getRandomIntInclusive(20, 28)
        const StartValue = randomnum/10
        this.ElPriser.push(StartValue)
        for (let i = 0; i < 24; i++) {
            const NewDate = new Date()
            NewDate.setSeconds(0)
            NewDate.setMinutes(0)
            const temp = NewDate.getHours()
            NewDate.setHours(temp-24+i)
            this.CurrentDate = NewDate.toLocaleString()
            this.Timer.push(this.CurrentDate)

            const randomnum = this.getRandomIntInclusive(-10, 10)
            this.ValueChange += randomnum/10
            if (StartValue + this.ValueChange > 3.8){
                this.ValueChange = 3.8 - StartValue
            }
            else if (StartValue + this.ValueChange <= 1.3){
                this.ValueChange = 1.3 - StartValue
            }
            this.ElPriser.push(StartValue + this.ValueChange)
        }
        console.log(this.Timer)
        this.PieData.push(
            {
                labels: this.ElmålerIds,
                values: this.ElmålerVærdier,
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
        },
        Line(){
            Plotly.newPlot("lineChart", this.LineData)
        },
        getRandomIntInclusive(min, max) {
            min = Math.ceil(min)
            max = Math.floor(max)
            return Math.floor(Math.random() * (max - min + 1) + min)
          }
    }
})