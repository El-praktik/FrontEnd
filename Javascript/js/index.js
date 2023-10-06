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
            lastMonthPrice: 0,
            currentMonthUsage: 0,
            lastMonthUsage: 0,
            lastMonthUsageBlock: 0,
            lastMonthUsageCommunity: 0
        }
    },
    created(){
        this.getMonthPrice()
        this.getCurrentMonthUsage()
        this.getLastMonthUsage()
        this.getLastMonthUsageBlock()
        this.getLastMonthUsageCommunity()

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
                labels: ["Dig", "Resten af blokken"],
                values: [0, 0],
                type: "pie"
            }
        )
        this.PieData2.push(
            {
                labels: ["Dig", "Resten af fællesskabet"],
                values: [0, 0],
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
            Plotly.newPlot("pieChart", this.PieData, {                
                plot_bgcolor: "rgba(0, 0, 0, 0)",
                paper_bgcolor: "rgba(0, 0, 0, 0)"})
            Plotly.newPlot("pieChart2", this.PieData2, {                
                plot_bgcolor: "rgba(0, 0, 0, 0)",
                paper_bgcolor: "rgba(0, 0, 0, 0)"})
            this.PieUpdate()
        },
        PieUpdate(){
            Plotly.restyle("pieChart", {"values": [[this.lastMonthUsage, this.lastMonthUsageBlock]]}),
            Plotly.restyle("pieChart2", {"values": [[this.lastMonthUsage, this.lastMonthUsageCommunity]]})
        },
        Line(){
            Plotly.newPlot("lineChart", this.LineData, {
                title: "Elpriser for sidste 24 timer",
                xaxis:{
                    title: "Timeinterval"
                },
                yaxis:{
                    title: "kr./kWh"
                },
                plot_bgcolor: "rgba(0, 0, 0, 0)", // Set to transparent
                paper_bgcolor: "rgba(0, 0, 0, 0)" // Adjust the desired 
            })
        },
        getRandomIntInclusive(min, max) {
            min = Math.ceil(min)
            max = Math.floor(max)
            return Math.floor(Math.random() * (max - min + 1) + min)
        },
        async getMonthPrice(){
            const result = await fetch(`http://localhost:5293/CurrentPrize/1&&-1`, {
                method: 'GET'
            })
            const data = await result.json()
            this.lastMonthPrice = data.toFixed(2)
            console.log(data)
        },
        async getCurrentMonthUsage(){
            const result = await fetch(`http://localhost:5293/CurrentMonth/1`, {
                method: 'GET'
            })
            const data = await result.json()
            this.currentMonthUsage = data.toFixed(2)
            console.log(data)
        },
        async getLastMonthUsage(){
            const result = await fetch(`http://localhost:5293/LastMonth/1`, {
                method: 'GET'
            })
            const data = await result.json()
            this.lastMonthUsage = data.toFixed(2)
            console.log(data)
        },
        async getLastMonthUsageBlock(){
            const result = await fetch(`http://localhost:5293/LastMonthBlock/1`, {
                method: 'GET'
            })
            const data = await result.json()
            this.lastMonthUsageBlock = data.toFixed(2)
            console.log(data)
        },
        async getLastMonthUsageCommunity(){
            const result = await fetch(`http://localhost:5293/AllLast`, {
                method: 'GET'
            })
            const data = await result.json()
            this.lastMonthUsageCommunity = data.toFixed(2)
            console.log(data)
        }
    }
})