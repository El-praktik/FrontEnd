const app = Vue.createApp({
    data() {
        return {
            Frontpage: true,
            Page1: false,
            Page2: false,
            Userpage: false,
            ElmålerIds: [1, 2, 3],
            ElmålerVærdier: [56, 34, 19],
            PieData: [],
            ElPriser: [2.25, 2.1, 1.9, 2.06, 2.2],
            Timer: ["10PM", "11PM", "12PM", "1AM", "2AM"],
            LineData: [],
        }
    },
    created(){
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
            this.Page1 = false,
            this.Page2 = false,
            this.Userpage = false
        },
        IntoPage1(){
            this.Frontpage = false,
            this.Page1 = true,
            this.Page2 = false,
            this.Userpage = false
        },
        IntoPage2(){
            this.Frontpage = false,
            this.Page1 = false,
            this.Page2 = true,
            this.Userpage = false
        },
        IntoUserpage(){
            this.Frontpage = false,
            this.Page1 = false,
            this.Page2 = false,
            this.Userpage = true
        },
        Pie(){
            Plotly.newPlot("pieChart", this.PieData)
        },
        Line(){
            Plotly.newPlot("lineChart", this.LineData)
        }
    }
})