pipeline {
     agent any
     stages {
         stage('deploy'){
         steps{
            sshagent(credentials:['ssh-alternance-server']){
               sh 'sudo bash /home/ubuntu/deploy/deploy_takikids.sh'
          }
        echo "success"
         }
       }
    }
}