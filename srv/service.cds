using TPL_projects from '../db/schema';


service TPL_service {

    entity Supplier as projection on TPL_projects.Supplier;
    entity Tasks as projection on TPL_projects.Tasks;
    
}