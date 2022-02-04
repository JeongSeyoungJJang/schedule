using { com.rememlog as my } from '../db/scheme';

service ScheduleService {
    // @Capabilities : { 
    //     InsertRestrictions.Insertable: true,
    //     UpdateRestrictions.Updatable: true,
    //     DeleteRestrictions.Deletable: false
    //  }
    entity User @(restrict: [
        {grant: ['READ'], to: ['RememlogViewer']},
        {grant: ['*'], to: ['RememlogManager']}
        ]) as projection on my.User;
    entity Schedule as projection on my.Schedule;
}