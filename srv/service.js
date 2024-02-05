const cds = require('@sap/cds');

module.exports = cds.service.impl(async function () {
    /* SERVICE ENTITIES */
    let {
        Supplier
    } = this.entities;



    const c4re1 = await cds.connect.to('iflow1');
    // const c4re2 = await cds.connect.to('iflow2');

    var criteria_firstRead = true;
    this.before('READ', Supplier, async (req) => {
        try {
            if (criteria_firstRead) {
                const resp = await c4re1.get('/http/PendingApprovals');
                await cds.tx(req).run(DELETE(Supplier));
                const spaces = resp;
                const entries1 = [];
                const entries2 = [];
                for (i = 0; i < spaces.length; i++) {
                    entries1.push({
                        sm_id: spaces[i],
                        supplier_name: spaces[i],
                        erp_vendor_code: spaces[i],
                    });


                    const url = 'https://95f860detrial.it-cpitrial05-rt.cfapps.us10-001.hana.ondemand.com/http/itemDetails';
                    const username = 'sb-56f343fd-174e-4d1b-8544-54cf0729074b!b224831|it-rt-95f860detrial!b26655';
                    const password = '9b6aafae-377f-434b-ae83-5b02fbd35b5c$jzUJLFFbKxrcmOOCWIdoVC0y9AeyOMlQzkiXDH0cb9Q=';
                    const taskId = spaces[i].uniqueName;

                    const headers = new Headers({
                        'Authorization': 'Basic ' + btoa(username + ':' + password),
                        'id': taskId,
                    });
                    let taskData = [];
                    await fetch(url, {
                        method: 'GET',
                        headers: headers,
                    })
                        .then(response => response.json())
                        .then(data => {
                            taskData = data;
                            console.log(taskData); // Log the data if needed
                        })
                        .catch(error => console.error('Error:', error));
                    taskData.forEach(vTaskData => {
                        entries2.push({
                            task_name: vTaskData,
                            sm_id: vTaskData,
                            start_date: vTaskData,
                            end_date: vTaskData,
                            tat_for_registration_completion: vTaskData,
                            user: vTaskData,
                        });
                    });

                    await cds.tx(req).run(DELETE(Tasks));

                }
                await cds.tx(req).run(INSERT.into(Supplier).entries(entries1));
                await cds.tx(req).run(INSERT.into(Tasks).entries(entries2));
                criteria_firstRead = false;

            }
            return req;
        } catch (err) {
            req.error(500, err.message);
        }
    });
});