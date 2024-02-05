namespace TPL_projects;

entity Supplier {
    key sm_id           : String;
        supplier_name   : String;
        erp_vendor_code : String;
        tasks           : Composition of many Tasks
                              on tasks.sm_id = sm_id;
}

entity Tasks {
    key task_name                       : String;
    key sm_id                           : String;
        start_date                      : String;
        end_date                        : String;
        tat_for_registration_completion : String;
        user                            : String;
        supplier                        : Association to one Supplier;
}