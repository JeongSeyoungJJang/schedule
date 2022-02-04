using { managed } from '@sap/cds/common';
namespace com.rememlog;


entity User: managed {

    key email: String(30);
        kakao_id:String(30);
        password: String; //암호화
        schedule: Association to many Schedule on schedule.email = $self.email;
}
entity Schedule : managed {
    key ID: UUID;
    email: String(30);
    title: String(50);
    descr: String(200);
    date: DateTime;
}