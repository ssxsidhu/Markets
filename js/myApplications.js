$(document).ready(function () {


    var username = localStorage.getItem('username');
    var profile = localStorage.getItem('profile');


    if (username != null) {
        //set up connection
        $(".menu").html(generateMenu(username)); //set up user menu
        var sort_events = [];
        var faunadb = window.faunadb;
        var q = faunadb.query;
        var client = new faunadb.Client({
            secret: 'fnAE0WnTguAATXwpxfX-ihF-aiYRMw8FJ9I_0nxl',
            // Adjust the endpoint if you are using Region Groups
            endpoint: 'https://db.us.fauna.com',
        });
        client.query([
                q.Map(
                    q.Paginate(q.Documents(q.Collection('User_Event'))),
                    q.Lambda(x => q.Get(x))
                )

            ]).then(function (res) {
                var length = res[0]["data"].length;
                var count = 0;
                if (length > 0) {
                    for (var i = 0; i < res[0]["data"].length; i++) {
                        var ref = res[0]["data"][i]["ref"]["value"]["id"];
                        var record = res[0]["data"][i]["data"];

                        if (record["username"] == username) {
                            var data = record["event"];
                            var time = data["year"]+"-"+data["month"]+"-"+data["date"];
                            var date= new Date(time);
                            data["ref"] = ref;
                            data["time"]=date;
                            sort_events.push(data);
                            console.log(sort_events);

                            count++;
                            $(".events").append(generateView(ref, data["fee"], data["date"], data["month"], data["year"], data["start"], data["end"], data["pic"], data["name"], data["id"], data["location"], data["description"], username, false, false, profile, data["status"]));
                        }
                    }

                }
                if (count <= 0 || length <= 0) {
                    $(".events").html(`
            <div class="alert alert-secondary " role="alert">
            <div class="d-flex justify-content-center">
            <h4 class="m-4">You haven't any applications yet</h4><a class='m-4 btn btn-success btn-sm' href ='index.html'>View Events</a></div></div>
            `);
                }
            })
            .catch(function (err) {
                console.log('Error:', err)
            });


        var selected;
        var unselected=[];
       $(document).on('click', '.sort', function(){
            $(".events").html("");
            
            var sort = $(this).text();
            selected=sort;
            if (sort == "A-Z") {
                sort_events.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
                unselected[0]='Latest';
                unselected[1]='Oldest';
            } else if (sort == "Latest") {
                sort_events.sort((a, b) => b.time - a.time);
                unselected[0]='A-Z';
                unselected[1]='Oldest';
            } else if (sort == "Oldest") {
                sort_events.sort((a, b) => a.time - b.time);
                unselected[0]='A-Z';
                unselected[1]='Latest';
            }

            document.getElementById('sort-'+selected).style.backgroundColor='seagreen';
            document.getElementById('sort-'+unselected[0]).style.backgroundColor='#aaa';
            document.getElementById('sort-'+unselected[0]).style=""
            document.getElementById('sort-'+unselected[1]).style.backgroundColor='#aaa';
            document.getElementById('sort-'+unselected[1]).style=""
    
            //to style the sort box.
            var styleElem = document.head.appendChild(document.createElement("style"));
            styleElem.innerHTML = ".dropdown .sort-expand::after {background: seagreen;}";
    
            $(".sort-button-text").text("Sorted by");
    
            for (var i = 0; i < sort_events.length; i++) {
                var data = sort_events[i];

                $(".events").append(generateView(data["ref"], data["fee"], data["date"], data["month"], data["year"], data["start"], data["end"], data["pic"], data["name"], data["id"], data["location"], data["description"], username, false, false, profile, data["status"]));
            }
        });

        $("#myForm").submit(function (event) {
            var form = $("#myForm");

            if ($(form)[0].checkValidity() === true) {
                var ref = localStorage.getItem("id");
                client.query(
                    q.Update(
                        q.Ref(q.Collection('User_Event'), ref), {
                            data: {
                                event: {
                                    status: 'Accepted'
                                }
                            }
                        },
                    )
                ).then(function (ret) {
                    console.log(ret)
                    $('#myModal').modal('show');
                });
            }
        });

        $(document).on('click', '.btn_pay_now', function () {
            var id = $(this).attr("id");
            id = id.replace("pay_", "ref_");
            var ref = $("#" + id).val();
            localStorage.setItem("id", ref);
            id=id.replace("ref_","");
            var obj =getEventById(id);
            localStorage.setItem("date",obj["dateTime"]);
            location.replace("payment.html")
        });

        
        $(document).on('click', '.btn_cancel', function () {
            var id = $(this).attr("id");
            var modal = id.replace("cancel_","event_");
            id = id.replace("cancel_","cancel_event_");
            
            $("#cancelModal .btn_cancel_event").attr("id",id);
            $("#event-cancel").text($("#"+modal+" .title").html());
        });


        $(document).on('click', '.btn_cancel_event', function () {
            var id = $(this).attr("id");
            id = id.replace("cancel_event_", "ref_");
            var ref = $("#" + id).val();
            client.query(
                q.Update(
                    q.Ref(q.Collection('User_Event'), ref), {
                        data: {
                            event: {
                                status: 'Cancelled'
                            }
                        }
                    },
                )
            ).then(function (ret) {
                console.log(ret)
                window.location.reload();
            });


        });


        $(document).on("click", ".viewSchedule", function(){
               localStorage.setItem("jump",true);
               window.location.href="mySchedule.html";
        });

    } else {
        window.location.href = "index.html";
    }


});