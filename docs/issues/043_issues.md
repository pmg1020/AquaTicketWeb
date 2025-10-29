"C:\Program Files\Java\jdk-17\bin\java.exe" -XX:TieredStopAtLevel=1 -Dspring.output.ansi.enabled=always -Dcom.sun.management.jmxremote -Dspring.jmx.enabled=true -Dspring.liveBeansView.mbeanDomain -Dspring.application.admin.enabled=true "-Dmanagement.endpoints.jmx.exposure.include=*" "-javaagent:C:\Program Files\JetBrains\IntelliJ IDEA 2024.3.5\lib\idea_rt.jar=9040" -Dfile.encoding=UTF-8 -classpath C:\aquaticket\aquaticket-back\build\classes\java\main;C:\aquaticket\aquaticket-back\build\resources\main;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.projectlombok\lombok\1.18.38\57f8f5e02e92a30fd21b80cbd426a4172b5f8e29\lombok-1.18.38.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework.boot\spring-boot-starter-web\3.5.5\b9039cd5aa1feda2cfbd487233e343f66627f78f\spring-boot-starter-web-3.5.5.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework.boot\spring-boot-starter-security\3.5.5\d46f4927ef806fbbb509da0fbeabc9274163ef4c\spring-boot-starter-security-3.5.5.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework.boot\spring-boot-starter-validation\3.5.5\5510bd155652ef231976f1ff1ca1bb1d9698829c\spring-boot-starter-validation-3.5.5.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework.boot\spring-boot-starter-data-jpa\3.5.5\1b0c807e0f584dcf2c8fe7360c07ff18faeacf30\spring-boot-starter-data-jpa-3.5.5.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework.boot\spring-boot-starter-oauth2-client\3.5.5\77e23acbfef0916fbb2f56953471aa4954b751b4\spring-boot-starter-oauth2-client-3.5.5.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\io.jsonwebtoken\jjwt-api\0.11.5\f742940045619d06383e7df37b21ac422b476cf1\jjwt-api-0.11.5.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\com.fasterxml.jackson.dataformat\jackson-dataformat-xml\2.15.2\e7e9038dee5c1adb1ebd07d3669e0e1182ac5b60\jackson-dataformat-xml-2.15.2.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework.boot\spring-boot-starter-json\3.5.5\316736898ceac2a806e08e981ea059c78b982383\spring-boot-starter-json-3.5.5.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework.boot\spring-boot-starter\3.5.5\f0e27ab73519ebebfc72c9b16ccde342cc9f599d\spring-boot-starter-3.5.5.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework.boot\spring-boot-starter-tomcat\3.5.5\c1342d34e6eeee72d98675d413ae2e925ea22852\spring-boot-starter-tomcat-3.5.5.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework\spring-webmvc\6.2.10\d3491aedc2636378cd273f6266d49f43a8b3e241\spring-webmvc-6.2.10.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework\spring-web\6.2.10\38c2f6633a44b385b6263294c38e5a4f217c005c\spring-web-6.2.10.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework.security\spring-security-web\6.5.3\29e50540ef987241f13ece8aa4297c524cdca5ed\spring-security-web-6.5.3.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework.security\spring-security-config\6.5.3\3f6b50fd0d0bd61dc1bc4e49c055b6995c47c2a3\spring-security-config-6.5.3.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework\spring-aop\6.2.10\2b194c29deaadb71a8a8e5b8b41d9521c29a0d66\spring-aop-6.2.10.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.apache.tomcat.embed\tomcat-embed-el\10.1.44\6ee7685651c5eba1f4bef99f9dbb38b89d1a6cb6\tomcat-embed-el-10.1.44.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.hibernate.validator\hibernate-validator\8.0.3.Final\4425f554297a1c5ba03a3f30e559a9fd91048cf8\hibernate-validator-8.0.3.Final.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework.boot\spring-boot-starter-jdbc\3.5.5\25ab9d086e35f606ea0147b10defdd1c8be3f25\spring-boot-starter-jdbc-3.5.5.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework.data\spring-data-jpa\3.5.3\ed2764475a3c53fec8d1b844f9700ce6427b29dc\spring-data-jpa-3.5.3.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.hibernate.orm\hibernate-core\6.6.26.Final\4a89014a34c7c46d15da49de85aa879c603c962\hibernate-core-6.6.26.Final.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework\spring-aspects\6.2.10\34303b4c9a50261522dbce2d4c3c659660b3c33\spring-aspects-6.2.10.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework.security\spring-security-oauth2-client\6.5.3\4519a9a2d45176926b5a0171c2236dc1776fc26f\spring-security-oauth2-client-6.5.3.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework.security\spring-security-oauth2-jose\6.5.3\dc56f4791f647f317b3a9a7f1c212987c2f6d1a\spring-security-oauth2-jose-6.5.3.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework.security\spring-security-core\6.5.3\1f526b23fad4f4db5c8cc1c30eed7abb82d32702\spring-security-core-6.5.3.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\com.fasterxml.jackson.core\jackson-databind\2.19.2\46509399d28f57ca32c6bb4b0d4e10e8f062051e\jackson-databind-2.19.2.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\com.fasterxml.jackson.core\jackson-annotations\2.19.2\c5381f11988ae3d424b197a26087d86067b6d7d\jackson-annotations-2.19.2.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\com.fasterxml.jackson.core\jackson-core\2.19.2\50f3b4bd59b9ff51a0ed493e7b5abaf5c39709bf\jackson-core-2.19.2.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\com.fasterxml.woodstox\woodstox-core\6.5.1\c6e52e84fe959e69a243c83ec7d24cd889444ddf\woodstox-core-6.5.1.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.codehaus.woodstox\stax2-api\4.2.1\a3f7325c52240418c2ba257b103c3c550e140c83\stax2-api-4.2.1.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\com.fasterxml.jackson.datatype\jackson-datatype-jdk8\2.19.2\a720d3946c3a1ab04b780f3b3163d62eee6948a0\jackson-datatype-jdk8-2.19.2.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\com.fasterxml.jackson.datatype\jackson-datatype-jsr310\2.19.2\72e73f048b36d9df82aef146bf8b2ae63b2e28e2\jackson-datatype-jsr310-2.19.2.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\com.fasterxml.jackson.module\jackson-module-parameter-names\2.19.2\3c4ce467c11364c72ec4967c570fd5a2d1be1d0b\jackson-module-parameter-names-2.19.2.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework.boot\spring-boot-autoconfigure\3.5.5\348f4fb99d61a1ea039a44ec667b61657adb54b2\spring-boot-autoconfigure-3.5.5.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework.boot\spring-boot\3.5.5\7d50b76ea4905d6c61fea5cb6556bc735c55da1\spring-boot-3.5.5.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework.boot\spring-boot-starter-logging\3.5.5\981750c503485e442e37b7cac1dc19c5ddfc6d58\spring-boot-starter-logging-3.5.5.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\jakarta.annotation\jakarta.annotation-api\2.1.1\48b9bda22b091b1f48b13af03fe36db3be6e1ae3\jakarta.annotation-api-2.1.1.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework\spring-core\6.2.10\82d9c797f9147b643ac0aab8a1a40e96f8d8a737\spring-core-6.2.10.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.yaml\snakeyaml\2.4\e0666b825b796f85521f02360e77f4c92c5a7a07\snakeyaml-2.4.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.apache.tomcat.embed\tomcat-embed-websocket\10.1.44\1966a8224858c4b4480469bfcdcaa3f8faf59cc7\tomcat-embed-websocket-10.1.44.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.apache.tomcat.embed\tomcat-embed-core\10.1.44\5e18d00936ca925c9249f1a8e77c0e8adf1d6287\tomcat-embed-core-10.1.44.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework\spring-context\6.2.10\80464a79539a19a00e32eccb041670f34857fe7\spring-context-6.2.10.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework\spring-beans\6.2.10\88ffda89593a74bb356a96ea2ed235ec6e083cfa\spring-beans-6.2.10.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework\spring-expression\6.2.10\16bdfead8a73673e395441c14b1868a128fc87c2\spring-expression-6.2.10.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\io.micrometer\micrometer-observation\1.15.3\e95d07e329f6d3ecb15a6ba1c5d96c25b9df0a97\micrometer-observation-1.15.3.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\jakarta.validation\jakarta.validation-api\3.0.2\92b6631659ba35ca09e44874d3eb936edfeee532\jakarta.validation-api-3.0.2.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.jboss.logging\jboss-logging\3.6.1.Final\886afbb445b4016a37c8960a7aef6ebd769ce7e5\jboss-logging-3.6.1.Final.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\com.fasterxml\classmate\1.7.0\e98374da1f2143ac8e6e0a95036994bb19137a3\classmate-1.7.0.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework\spring-jdbc\6.2.10\4514e36bf0880464b9b55ecf0ea6ebd7362b664\spring-jdbc-6.2.10.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\com.zaxxer\HikariCP\6.3.2\d09ad7d252c2a8daaa99ed5f3b0d54f95b9b344\HikariCP-6.3.2.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework\spring-orm\6.2.10\4bf04f4693bfbb56248b0dccc7f5e0ec77f95ca6\spring-orm-6.2.10.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework.data\spring-data-commons\3.5.3\886e56cfc383f757f057901dc7c448d8dcc73fed\spring-data-commons-3.5.3.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework\spring-tx\6.2.10\bd4915d9862f127b45bae75195622d84f36a5373\spring-tx-6.2.10.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.antlr\antlr4-runtime\4.13.0\5a02e48521624faaf5ff4d99afc88b01686af655\antlr4-runtime-4.13.0.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.slf4j\slf4j-api\2.0.17\d9e58ac9c7779ba3bf8142aff6c830617a7fe60f\slf4j-api-2.0.17.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\jakarta.persistence\jakarta.persistence-api\3.1.0\66901fa1c373c6aff65c13791cc11da72060a8d6\jakarta.persistence-api-3.1.0.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\jakarta.transaction\jakarta.transaction-api\2.0.1\51a520e3fae406abb84e2e1148e6746ce3f80a1a\jakarta.transaction-api-2.0.1.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.aspectj\aspectjweaver\1.9.24\9b5aeb0cea9f958b9c57fb80e62996e95a3e9379\aspectjweaver-1.9.24.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework.security\spring-security-oauth2-core\6.5.3\a7375808f7030850d76b2afd79c28a9ad403d3af\spring-security-oauth2-core-6.5.3.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\com.nimbusds\oauth2-oidc-sdk\9.43.6\a1842456e236f53e30946b2cb0bdeb17a44cdfd3\oauth2-oidc-sdk-9.43.6.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\com.nimbusds\nimbus-jose-jwt\9.37.3\700f71ffefd60c16bd8ce711a956967ea9071cec\nimbus-jose-jwt-9.37.3.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework.security\spring-security-crypto\6.5.3\b120779667b42a1a412aa0e4426dfab5287f2d5a\spring-security-crypto-6.5.3.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\ch.qos.logback\logback-classic\1.5.18\fc371f3fc97a639de2d67947cffb7518ec5e3d40\logback-classic-1.5.18.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.apache.logging.log4j\log4j-to-slf4j\2.24.3\da1143e2a2531ee1c2d90baa98eb50a28a39d5a7\log4j-to-slf4j-2.24.3.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.slf4j\jul-to-slf4j\2.0.17\524cb6ccc2b68a57604750e1ab8b13b5a786a6aa\jul-to-slf4j-2.0.17.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.springframework\spring-jcl\6.2.10\9ff7e998fe11d991f6b7fd000a0c6583c9e6ffee\spring-jcl-6.2.10.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\io.micrometer\micrometer-commons\1.15.3\3a97060d64a54daa11f14365aebc559fa8820281\micrometer-commons-1.15.3.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\com.github.stephenc.jcip\jcip-annotations\1.0-1\ef31541dd28ae2cefdd17c7ebf352d93e9058c63\jcip-annotations-1.0-1.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\com.nimbusds\content-type\2.2\9a894bce7646dd4086652d85b88013229f23724b\content-type-2.2.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\net.minidev\json-smart\2.5.2\95d166b18f95907be0f46cdb9e1c0695eed03387\json-smart-2.5.2.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\com.nimbusds\lang-tag\1.7\97c73ecd70bc7e8eefb26c5eea84f251a63f1031\lang-tag-1.7.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\ch.qos.logback\logback-core\1.5.18\6c0375624f6f36b4e089e2488ba21334a11ef13f\logback-core-1.5.18.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.apache.logging.log4j\log4j-api\2.24.3\b02c125db8b6d295adf72ae6e71af5d83bce2370\log4j-api-2.24.3.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\net.minidev\accessors-smart\2.5.2\ce16fd235cfee48e67eda33e684423bba09f7d07\accessors-smart-2.5.2.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.ow2.asm\asm\9.7.1\f0ed132a49244b042cd0e15702ab9f2ce3cc8436\asm-9.7.1.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\io.jsonwebtoken\jjwt-impl\0.11.5\40a599f0e8a8e4e0701596fbb15e67bfda64fdf0\jjwt-impl-0.11.5.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\io.jsonwebtoken\jjwt-jackson\0.11.5\3b83a06809e98a69402d7333dcf67df6f6ea4579\jjwt-jackson-0.11.5.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\com.mysql\mysql-connector-j\9.4.0\8f6c66269048fbd2316b7b45d75898ebee44986f\mysql-connector-j-9.4.0.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.hibernate.common\hibernate-commons-annotations\7.0.3.Final\e183c4be8bb41d12e9f19b374e00c34a0a85f439\hibernate-commons-annotations-7.0.3.Final.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\io.smallrye\jandex\3.2.0\f17ad860f62a08487b9edabde608f8ac55c62fa7\jandex-3.2.0.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\net.bytebuddy\byte-buddy\1.17.7\3856bfab61beb23e099a0d6629f2ba8de4b98ace\byte-buddy-1.17.7.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.glassfish.jaxb\jaxb-runtime\4.0.5\ca84c2a7169b5293e232b9d00d1e4e36d4c3914a\jaxb-runtime-4.0.5.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\jakarta.xml.bind\jakarta.xml.bind-api\4.0.2\6cd5a999b834b63238005b7144136379dc36cad2\jakarta.xml.bind-api-4.0.2.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\jakarta.inject\jakarta.inject-api\2.0.1\4c28afe1991a941d7702fe1362c365f0a8641d1e\jakarta.inject-api-2.0.1.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.glassfish.jaxb\jaxb-core\4.0.5\7b4b11ea5542eea4ad55e1080b23be436795b3\jaxb-core-4.0.5.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\jakarta.activation\jakarta.activation-api\2.1.3\fa165bd70cda600368eee31555222776a46b881f\jakarta.activation-api-2.1.3.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.eclipse.angus\angus-activation\2.0.2\41f1e0ddd157c856926ed149ab837d110955a9fc\angus-activation-2.0.2.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\org.glassfish.jaxb\txw2\4.0.5\f36a4ef12120a9bb06d766d6a0e54b144fd7ed98\txw2-4.0.5.jar;C:\Users\nem40\.gradle\caches\modules-2\files-2.1\com.sun.istack\istack-commons-runtime\4.1.2\18ec117c85f3ba0ac65409136afa8e42bc74e739\istack-commons-runtime-4.1.2.jar com.aquaticket.aquaticketback.AquaticketBackApplication

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/

 :: Spring Boot ::                (v3.5.5)

2025-10-27T11:40:51.787+09:00  INFO 28344 --- [aquaticket-back] [           main] c.a.a.AquaticketBackApplication          : Starting AquaticketBackApplication using Java 17.0.12 with PID 28344 (C:\aquaticket\aquaticket-back\build\classes\java\main started by nem40 in C:\aquaticket\aquaticket-back)
2025-10-27T11:40:51.789+09:00  INFO 28344 --- [aquaticket-back] [           main] c.a.a.AquaticketBackApplication          : No active profile set, falling back to 1 default profile: "default"
2025-10-27T11:40:52.204+09:00  INFO 28344 --- [aquaticket-back] [           main] .s.d.r.c.RepositoryConfigurationDelegate : Bootstrapping Spring Data JPA repositories in DEFAULT mode.
2025-10-27T11:40:52.255+09:00  INFO 28344 --- [aquaticket-back] [           main] .s.d.r.c.RepositoryConfigurationDelegate : Finished Spring Data repository scanning in 44 ms. Found 10 JPA repository interfaces.
2025-10-27T11:40:52.530+09:00  INFO 28344 --- [aquaticket-back] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port 8080 (http)
2025-10-27T11:40:52.537+09:00  INFO 28344 --- [aquaticket-back] [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2025-10-27T11:40:52.537+09:00  INFO 28344 --- [aquaticket-back] [           main] o.apache.catalina.core.StandardEngine    : Starting Servlet engine: [Apache Tomcat/10.1.44]
2025-10-27T11:40:52.569+09:00  INFO 28344 --- [aquaticket-back] [           main] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2025-10-27T11:40:52.570+09:00  INFO 28344 --- [aquaticket-back] [           main] w.s.c.ServletWebServerApplicationContext : Root WebApplicationContext: initialization completed in 751 ms
2025-10-27T11:40:52.631+09:00  INFO 28344 --- [aquaticket-back] [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Starting...
2025-10-27T11:40:52.794+09:00  INFO 28344 --- [aquaticket-back] [           main] com.zaxxer.hikari.pool.HikariPool        : HikariPool-1 - Added connection com.mysql.cj.jdbc.ConnectionImpl@2bba35ef
2025-10-27T11:40:52.795+09:00  INFO 28344 --- [aquaticket-back] [           main] com.zaxxer.hikari.HikariDataSource       : HikariPool-1 - Start completed.
2025-10-27T11:40:52.837+09:00  INFO 28344 --- [aquaticket-back] [           main] o.hibernate.jpa.internal.util.LogHelper  : HHH000204: Processing PersistenceUnitInfo [name: default]
2025-10-27T11:40:52.869+09:00  INFO 28344 --- [aquaticket-back] [           main] org.hibernate.Version                    : HHH000412: Hibernate ORM core version 6.6.26.Final
2025-10-27T11:40:52.886+09:00  INFO 28344 --- [aquaticket-back] [           main] o.h.c.internal.RegionFactoryInitiator    : HHH000026: Second-level cache disabled
2025-10-27T11:40:53.048+09:00  INFO 28344 --- [aquaticket-back] [           main] o.s.o.j.p.SpringPersistenceUnitInfo      : No LoadTimeWeaver setup: ignoring JPA class transformer
2025-10-27T11:40:53.110+09:00  INFO 28344 --- [aquaticket-back] [           main] org.hibernate.orm.connections.pooling    : HHH10001005: Database info:
	Database JDBC URL [Connecting through datasource 'HikariDataSource (HikariPool-1)']
	Database driver: undefined/unknown
	Database version: 8.0.41
	Autocommit mode: undefined/unknown
	Isolation level: undefined/unknown
	Minimum pool size: undefined/unknown
	Maximum pool size: undefined/unknown
2025-10-27T11:40:53.649+09:00  INFO 28344 --- [aquaticket-back] [           main] o.h.e.t.j.p.i.JtaPlatformInitiator       : HHH000489: No JTA platform available (set 'hibernate.transaction.jta.platform' to enable JTA platform integration)
Hibernate:
    alter table performances
       drop
       foreign key FKjl9p341hkh5talqet9d09p3mi
Hibernate:
    alter table reservation_seats
       drop
       foreign key FK755roqq37bto59vxaxis9x3nt
Hibernate:
    alter table reservation_seats
       drop
       foreign key FKo4tbgy4jg06hfaugqx2gxx9we
Hibernate:
    alter table reservations
       drop
       foreign key FKq768uevy4c6ji14lhuwxlcj5l
Hibernate:
    alter table reservations
       drop
       foreign key FKddwb0eaoaescreoyp9gpmttbb
2025-10-27T11:40:53.716+09:00  WARN 28344 --- [aquaticket-back] [           main] o.h.t.s.i.ExceptionHandlerLoggedImpl     : GenerationTarget encountered exception accepting command : Error executing DDL "
    alter table reservations
       drop
       foreign key FKddwb0eaoaescreoyp9gpmttbb" via JDBC [Can't DROP 'FKddwb0eaoaescreoyp9gpmttbb'; check that column/key exists]

org.hibernate.tool.schema.spi.CommandAcceptanceException: Error executing DDL "
    alter table reservations
       drop
       foreign key FKddwb0eaoaescreoyp9gpmttbb" via JDBC [Can't DROP 'FKddwb0eaoaescreoyp9gpmttbb'; check that column/key exists]
	at org.hibernate.tool.schema.internal.exec.GenerationTargetToDatabase.accept(GenerationTargetToDatabase.java:94) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.Helper.applySqlString(Helper.java:233) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.Helper.applySqlStrings(Helper.java:217) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.applyConstraintDropping(SchemaDropperImpl.java:479) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.dropConstraintsTablesSequences(SchemaDropperImpl.java:245) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.dropFromMetadata(SchemaDropperImpl.java:218) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.performDrop(SchemaDropperImpl.java:186) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.doDrop(SchemaDropperImpl.java:156) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.doDrop(SchemaDropperImpl.java:116) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.performDatabaseAction(SchemaManagementToolCoordinator.java:238) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.lambda$process$5(SchemaManagementToolCoordinator.java:144) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at java.base/java.util.HashMap.forEach(HashMap.java:1421) ~[na:na]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.process(SchemaManagementToolCoordinator.java:141) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.boot.internal.SessionFactoryObserverForSchemaExport.sessionFactoryCreated(SessionFactoryObserverForSchemaExport.java:37) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.internal.SessionFactoryObserverChain.sessionFactoryCreated(SessionFactoryObserverChain.java:35) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.internal.SessionFactoryImpl.<init>(SessionFactoryImpl.java:324) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.boot.internal.SessionFactoryBuilderImpl.build(SessionFactoryBuilderImpl.java:463) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.jpa.boot.internal.EntityManagerFactoryBuilderImpl.build(EntityManagerFactoryBuilderImpl.java:1517) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.springframework.orm.jpa.vendor.SpringHibernateJpaPersistenceProvider.createContainerEntityManagerFactory(SpringHibernateJpaPersistenceProvider.java:66) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean.createNativeEntityManagerFactory(LocalContainerEntityManagerFactoryBean.java:390) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.buildNativeEntityManagerFactory(AbstractEntityManagerFactoryBean.java:419) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.afterPropertiesSet(AbstractEntityManagerFactoryBean.java:400) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean.afterPropertiesSet(LocalContainerEntityManagerFactoryBean.java:366) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.invokeInitMethods(AbstractAutowireCapableBeanFactory.java:1873) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1822) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:607) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:529) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:339) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:373) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:337) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:207) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.context.support.AbstractApplicationContext.finishBeanFactoryInitialization(AbstractApplicationContext.java:970) ~[spring-context-6.2.10.jar:6.2.10]
	at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:627) ~[spring-context-6.2.10.jar:6.2.10]
	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.refresh(ServletWebServerApplicationContext.java:146) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.refresh(SpringApplication.java:752) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.refreshContext(SpringApplication.java:439) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:318) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1361) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1350) ~[spring-boot-3.5.5.jar:3.5.5]
	at com.aquaticket.aquaticketback.AquaticketBackApplication.main(AquaticketBackApplication.java:10) ~[main/:na]
Caused by: java.sql.SQLSyntaxErrorException: Can't DROP 'FKddwb0eaoaescreoyp9gpmttbb'; check that column/key exists
	at com.mysql.cj.jdbc.exceptions.SQLError.createSQLException(SQLError.java:112) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.exceptions.SQLExceptionsMapping.translateException(SQLExceptionsMapping.java:114) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.StatementImpl.executeInternal(StatementImpl.java:837) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.StatementImpl.execute(StatementImpl.java:685) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.zaxxer.hikari.pool.ProxyStatement.execute(ProxyStatement.java:95) ~[HikariCP-6.3.2.jar:na]
	at com.zaxxer.hikari.pool.HikariProxyStatement.execute(HikariProxyStatement.java) ~[HikariCP-6.3.2.jar:na]
	at org.hibernate.tool.schema.internal.exec.GenerationTargetToDatabase.accept(GenerationTargetToDatabase.java:80) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	... 39 common frames omitted

Hibernate:
    alter table reservations
       drop
       foreign key FKb5g9io5h54iwl2inkno50ppln
Hibernate:
    alter table seat_locks
       drop
       foreign key FK3gu7p6phtcueo8j8vgl2ggcur
Hibernate:
    alter table seat_locks
       drop
       foreign key FK6mhk56depph9dpx6en00b0neg
Hibernate:
    alter table seat_locks
       drop
       foreign key FK6cxw0lm7tl4sh0ayr7ux3rkoc
Hibernate:
    alter table seats
       drop
       foreign key FKfahhtb0bb0u1wcnqqys0iehmo
Hibernate:
    alter table shows
       drop
       foreign key FKc3fb3hjccbxy073kvrremssj2
Hibernate:
    alter table showtimes
       drop
       foreign key FK7u61cv5se2cicmvs5j8412tg8
Hibernate:
    drop table if exists performances
2025-10-27T11:40:53.769+09:00  WARN 28344 --- [aquaticket-back] [           main] o.h.t.s.i.ExceptionHandlerLoggedImpl     : GenerationTarget encountered exception accepting command : Error executing DDL "
    drop table if exists performances" via JDBC [Cannot drop table 'performances' referenced by a foreign key constraint 'showtimes_ibfk_1' on table 'showtimes'.]

org.hibernate.tool.schema.spi.CommandAcceptanceException: Error executing DDL "
    drop table if exists performances" via JDBC [Cannot drop table 'performances' referenced by a foreign key constraint 'showtimes_ibfk_1' on table 'showtimes'.]
	at org.hibernate.tool.schema.internal.exec.GenerationTargetToDatabase.accept(GenerationTargetToDatabase.java:94) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.Helper.applySqlString(Helper.java:233) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.Helper.applySqlStrings(Helper.java:217) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.dropTables(SchemaDropperImpl.java:384) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.dropConstraintsTablesSequences(SchemaDropperImpl.java:256) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.dropFromMetadata(SchemaDropperImpl.java:218) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.performDrop(SchemaDropperImpl.java:186) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.doDrop(SchemaDropperImpl.java:156) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.doDrop(SchemaDropperImpl.java:116) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.performDatabaseAction(SchemaManagementToolCoordinator.java:238) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.lambda$process$5(SchemaManagementToolCoordinator.java:144) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at java.base/java.util.HashMap.forEach(HashMap.java:1421) ~[na:na]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.process(SchemaManagementToolCoordinator.java:141) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.boot.internal.SessionFactoryObserverForSchemaExport.sessionFactoryCreated(SessionFactoryObserverForSchemaExport.java:37) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.internal.SessionFactoryObserverChain.sessionFactoryCreated(SessionFactoryObserverChain.java:35) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.internal.SessionFactoryImpl.<init>(SessionFactoryImpl.java:324) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.boot.internal.SessionFactoryBuilderImpl.build(SessionFactoryBuilderImpl.java:463) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.jpa.boot.internal.EntityManagerFactoryBuilderImpl.build(EntityManagerFactoryBuilderImpl.java:1517) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.springframework.orm.jpa.vendor.SpringHibernateJpaPersistenceProvider.createContainerEntityManagerFactory(SpringHibernateJpaPersistenceProvider.java:66) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean.createNativeEntityManagerFactory(LocalContainerEntityManagerFactoryBean.java:390) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.buildNativeEntityManagerFactory(AbstractEntityManagerFactoryBean.java:419) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.afterPropertiesSet(AbstractEntityManagerFactoryBean.java:400) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean.afterPropertiesSet(LocalContainerEntityManagerFactoryBean.java:366) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.invokeInitMethods(AbstractAutowireCapableBeanFactory.java:1873) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1822) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:607) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:529) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:339) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:373) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:337) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:207) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.context.support.AbstractApplicationContext.finishBeanFactoryInitialization(AbstractApplicationContext.java:970) ~[spring-context-6.2.10.jar:6.2.10]
	at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:627) ~[spring-context-6.2.10.jar:6.2.10]
	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.refresh(ServletWebServerApplicationContext.java:146) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.refresh(SpringApplication.java:752) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.refreshContext(SpringApplication.java:439) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:318) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1361) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1350) ~[spring-boot-3.5.5.jar:3.5.5]
	at com.aquaticket.aquaticketback.AquaticketBackApplication.main(AquaticketBackApplication.java:10) ~[main/:na]
Caused by: java.sql.SQLException: Cannot drop table 'performances' referenced by a foreign key constraint 'showtimes_ibfk_1' on table 'showtimes'.
	at com.mysql.cj.jdbc.exceptions.SQLError.createSQLException(SQLError.java:121) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.exceptions.SQLExceptionsMapping.translateException(SQLExceptionsMapping.java:114) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.StatementImpl.executeInternal(StatementImpl.java:837) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.StatementImpl.execute(StatementImpl.java:685) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.zaxxer.hikari.pool.ProxyStatement.execute(ProxyStatement.java:95) ~[HikariCP-6.3.2.jar:na]
	at com.zaxxer.hikari.pool.HikariProxyStatement.execute(HikariProxyStatement.java) ~[HikariCP-6.3.2.jar:na]
	at org.hibernate.tool.schema.internal.exec.GenerationTargetToDatabase.accept(GenerationTargetToDatabase.java:80) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	... 39 common frames omitted

Hibernate:
    drop table if exists reservation_seats
Hibernate:
    drop table if exists reservations
2025-10-27T11:40:53.776+09:00  WARN 28344 --- [aquaticket-back] [           main] o.h.t.s.i.ExceptionHandlerLoggedImpl     : GenerationTarget encountered exception accepting command : Error executing DDL "
    drop table if exists reservations" via JDBC [Cannot drop table 'reservations' referenced by a foreign key constraint 'reservation_items_ibfk_1' on table 'reservation_items'.]

org.hibernate.tool.schema.spi.CommandAcceptanceException: Error executing DDL "
    drop table if exists reservations" via JDBC [Cannot drop table 'reservations' referenced by a foreign key constraint 'reservation_items_ibfk_1' on table 'reservation_items'.]
	at org.hibernate.tool.schema.internal.exec.GenerationTargetToDatabase.accept(GenerationTargetToDatabase.java:94) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.Helper.applySqlString(Helper.java:233) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.Helper.applySqlStrings(Helper.java:217) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.dropTables(SchemaDropperImpl.java:384) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.dropConstraintsTablesSequences(SchemaDropperImpl.java:256) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.dropFromMetadata(SchemaDropperImpl.java:218) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.performDrop(SchemaDropperImpl.java:186) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.doDrop(SchemaDropperImpl.java:156) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.doDrop(SchemaDropperImpl.java:116) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.performDatabaseAction(SchemaManagementToolCoordinator.java:238) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.lambda$process$5(SchemaManagementToolCoordinator.java:144) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at java.base/java.util.HashMap.forEach(HashMap.java:1421) ~[na:na]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.process(SchemaManagementToolCoordinator.java:141) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.boot.internal.SessionFactoryObserverForSchemaExport.sessionFactoryCreated(SessionFactoryObserverForSchemaExport.java:37) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.internal.SessionFactoryObserverChain.sessionFactoryCreated(SessionFactoryObserverChain.java:35) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.internal.SessionFactoryImpl.<init>(SessionFactoryImpl.java:324) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.boot.internal.SessionFactoryBuilderImpl.build(SessionFactoryBuilderImpl.java:463) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.jpa.boot.internal.EntityManagerFactoryBuilderImpl.build(EntityManagerFactoryBuilderImpl.java:1517) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.springframework.orm.jpa.vendor.SpringHibernateJpaPersistenceProvider.createContainerEntityManagerFactory(SpringHibernateJpaPersistenceProvider.java:66) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean.createNativeEntityManagerFactory(LocalContainerEntityManagerFactoryBean.java:390) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.buildNativeEntityManagerFactory(AbstractEntityManagerFactoryBean.java:419) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.afterPropertiesSet(AbstractEntityManagerFactoryBean.java:400) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean.afterPropertiesSet(LocalContainerEntityManagerFactoryBean.java:366) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.invokeInitMethods(AbstractAutowireCapableBeanFactory.java:1873) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1822) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:607) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:529) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:339) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:373) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:337) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:207) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.context.support.AbstractApplicationContext.finishBeanFactoryInitialization(AbstractApplicationContext.java:970) ~[spring-context-6.2.10.jar:6.2.10]
	at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:627) ~[spring-context-6.2.10.jar:6.2.10]
	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.refresh(ServletWebServerApplicationContext.java:146) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.refresh(SpringApplication.java:752) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.refreshContext(SpringApplication.java:439) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:318) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1361) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1350) ~[spring-boot-3.5.5.jar:3.5.5]
	at com.aquaticket.aquaticketback.AquaticketBackApplication.main(AquaticketBackApplication.java:10) ~[main/:na]
Caused by: java.sql.SQLException: Cannot drop table 'reservations' referenced by a foreign key constraint 'reservation_items_ibfk_1' on table 'reservation_items'.
	at com.mysql.cj.jdbc.exceptions.SQLError.createSQLException(SQLError.java:121) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.exceptions.SQLExceptionsMapping.translateException(SQLExceptionsMapping.java:114) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.StatementImpl.executeInternal(StatementImpl.java:837) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.StatementImpl.execute(StatementImpl.java:685) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.zaxxer.hikari.pool.ProxyStatement.execute(ProxyStatement.java:95) ~[HikariCP-6.3.2.jar:na]
	at com.zaxxer.hikari.pool.HikariProxyStatement.execute(HikariProxyStatement.java) ~[HikariCP-6.3.2.jar:na]
	at org.hibernate.tool.schema.internal.exec.GenerationTargetToDatabase.accept(GenerationTargetToDatabase.java:80) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	... 39 common frames omitted

Hibernate:
    drop table if exists seat_locks
Hibernate:
    drop table if exists seats
2025-10-27T11:40:53.783+09:00  WARN 28344 --- [aquaticket-back] [           main] o.h.t.s.i.ExceptionHandlerLoggedImpl     : GenerationTarget encountered exception accepting command : Error executing DDL "
    drop table if exists seats" via JDBC [Cannot drop table 'seats' referenced by a foreign key constraint 'seat_holds_ibfk_2' on table 'seat_holds'.]

org.hibernate.tool.schema.spi.CommandAcceptanceException: Error executing DDL "
    drop table if exists seats" via JDBC [Cannot drop table 'seats' referenced by a foreign key constraint 'seat_holds_ibfk_2' on table 'seat_holds'.]
	at org.hibernate.tool.schema.internal.exec.GenerationTargetToDatabase.accept(GenerationTargetToDatabase.java:94) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.Helper.applySqlString(Helper.java:233) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.Helper.applySqlStrings(Helper.java:217) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.dropTables(SchemaDropperImpl.java:384) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.dropConstraintsTablesSequences(SchemaDropperImpl.java:256) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.dropFromMetadata(SchemaDropperImpl.java:218) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.performDrop(SchemaDropperImpl.java:186) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.doDrop(SchemaDropperImpl.java:156) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.doDrop(SchemaDropperImpl.java:116) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.performDatabaseAction(SchemaManagementToolCoordinator.java:238) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.lambda$process$5(SchemaManagementToolCoordinator.java:144) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at java.base/java.util.HashMap.forEach(HashMap.java:1421) ~[na:na]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.process(SchemaManagementToolCoordinator.java:141) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.boot.internal.SessionFactoryObserverForSchemaExport.sessionFactoryCreated(SessionFactoryObserverForSchemaExport.java:37) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.internal.SessionFactoryObserverChain.sessionFactoryCreated(SessionFactoryObserverChain.java:35) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.internal.SessionFactoryImpl.<init>(SessionFactoryImpl.java:324) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.boot.internal.SessionFactoryBuilderImpl.build(SessionFactoryBuilderImpl.java:463) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.jpa.boot.internal.EntityManagerFactoryBuilderImpl.build(EntityManagerFactoryBuilderImpl.java:1517) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.springframework.orm.jpa.vendor.SpringHibernateJpaPersistenceProvider.createContainerEntityManagerFactory(SpringHibernateJpaPersistenceProvider.java:66) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean.createNativeEntityManagerFactory(LocalContainerEntityManagerFactoryBean.java:390) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.buildNativeEntityManagerFactory(AbstractEntityManagerFactoryBean.java:419) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.afterPropertiesSet(AbstractEntityManagerFactoryBean.java:400) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean.afterPropertiesSet(LocalContainerEntityManagerFactoryBean.java:366) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.invokeInitMethods(AbstractAutowireCapableBeanFactory.java:1873) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1822) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:607) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:529) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:339) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:373) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:337) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:207) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.context.support.AbstractApplicationContext.finishBeanFactoryInitialization(AbstractApplicationContext.java:970) ~[spring-context-6.2.10.jar:6.2.10]
	at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:627) ~[spring-context-6.2.10.jar:6.2.10]
	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.refresh(ServletWebServerApplicationContext.java:146) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.refresh(SpringApplication.java:752) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.refreshContext(SpringApplication.java:439) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:318) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1361) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1350) ~[spring-boot-3.5.5.jar:3.5.5]
	at com.aquaticket.aquaticketback.AquaticketBackApplication.main(AquaticketBackApplication.java:10) ~[main/:na]
Caused by: java.sql.SQLException: Cannot drop table 'seats' referenced by a foreign key constraint 'seat_holds_ibfk_2' on table 'seat_holds'.
	at com.mysql.cj.jdbc.exceptions.SQLError.createSQLException(SQLError.java:121) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.exceptions.SQLExceptionsMapping.translateException(SQLExceptionsMapping.java:114) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.StatementImpl.executeInternal(StatementImpl.java:837) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.StatementImpl.execute(StatementImpl.java:685) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.zaxxer.hikari.pool.ProxyStatement.execute(ProxyStatement.java:95) ~[HikariCP-6.3.2.jar:na]
	at com.zaxxer.hikari.pool.HikariProxyStatement.execute(HikariProxyStatement.java) ~[HikariCP-6.3.2.jar:na]
	at org.hibernate.tool.schema.internal.exec.GenerationTargetToDatabase.accept(GenerationTargetToDatabase.java:80) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	... 39 common frames omitted

Hibernate:
    drop table if exists shows
2025-10-27T11:40:53.785+09:00  WARN 28344 --- [aquaticket-back] [           main] o.h.t.s.i.ExceptionHandlerLoggedImpl     : GenerationTarget encountered exception accepting command : Error executing DDL "
    drop table if exists shows" via JDBC [Cannot drop table 'shows' referenced by a foreign key constraint 'FKnkixaet37j2pq8iqv395cdpr8' on table 'reservation'.]

org.hibernate.tool.schema.spi.CommandAcceptanceException: Error executing DDL "
    drop table if exists shows" via JDBC [Cannot drop table 'shows' referenced by a foreign key constraint 'FKnkixaet37j2pq8iqv395cdpr8' on table 'reservation'.]
	at org.hibernate.tool.schema.internal.exec.GenerationTargetToDatabase.accept(GenerationTargetToDatabase.java:94) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.Helper.applySqlString(Helper.java:233) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.Helper.applySqlStrings(Helper.java:217) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.dropTables(SchemaDropperImpl.java:384) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.dropConstraintsTablesSequences(SchemaDropperImpl.java:256) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.dropFromMetadata(SchemaDropperImpl.java:218) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.performDrop(SchemaDropperImpl.java:186) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.doDrop(SchemaDropperImpl.java:156) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.doDrop(SchemaDropperImpl.java:116) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.performDatabaseAction(SchemaManagementToolCoordinator.java:238) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.lambda$process$5(SchemaManagementToolCoordinator.java:144) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at java.base/java.util.HashMap.forEach(HashMap.java:1421) ~[na:na]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.process(SchemaManagementToolCoordinator.java:141) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.boot.internal.SessionFactoryObserverForSchemaExport.sessionFactoryCreated(SessionFactoryObserverForSchemaExport.java:37) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.internal.SessionFactoryObserverChain.sessionFactoryCreated(SessionFactoryObserverChain.java:35) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.internal.SessionFactoryImpl.<init>(SessionFactoryImpl.java:324) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.boot.internal.SessionFactoryBuilderImpl.build(SessionFactoryBuilderImpl.java:463) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.jpa.boot.internal.EntityManagerFactoryBuilderImpl.build(EntityManagerFactoryBuilderImpl.java:1517) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.springframework.orm.jpa.vendor.SpringHibernateJpaPersistenceProvider.createContainerEntityManagerFactory(SpringHibernateJpaPersistenceProvider.java:66) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean.createNativeEntityManagerFactory(LocalContainerEntityManagerFactoryBean.java:390) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.buildNativeEntityManagerFactory(AbstractEntityManagerFactoryBean.java:419) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.afterPropertiesSet(AbstractEntityManagerFactoryBean.java:400) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean.afterPropertiesSet(LocalContainerEntityManagerFactoryBean.java:366) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.invokeInitMethods(AbstractAutowireCapableBeanFactory.java:1873) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1822) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:607) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:529) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:339) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:373) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:337) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:207) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.context.support.AbstractApplicationContext.finishBeanFactoryInitialization(AbstractApplicationContext.java:970) ~[spring-context-6.2.10.jar:6.2.10]
	at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:627) ~[spring-context-6.2.10.jar:6.2.10]
	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.refresh(ServletWebServerApplicationContext.java:146) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.refresh(SpringApplication.java:752) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.refreshContext(SpringApplication.java:439) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:318) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1361) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1350) ~[spring-boot-3.5.5.jar:3.5.5]
	at com.aquaticket.aquaticketback.AquaticketBackApplication.main(AquaticketBackApplication.java:10) ~[main/:na]
Caused by: java.sql.SQLException: Cannot drop table 'shows' referenced by a foreign key constraint 'FKnkixaet37j2pq8iqv395cdpr8' on table 'reservation'.
	at com.mysql.cj.jdbc.exceptions.SQLError.createSQLException(SQLError.java:121) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.exceptions.SQLExceptionsMapping.translateException(SQLExceptionsMapping.java:114) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.StatementImpl.executeInternal(StatementImpl.java:837) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.StatementImpl.execute(StatementImpl.java:685) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.zaxxer.hikari.pool.ProxyStatement.execute(ProxyStatement.java:95) ~[HikariCP-6.3.2.jar:na]
	at com.zaxxer.hikari.pool.HikariProxyStatement.execute(HikariProxyStatement.java) ~[HikariCP-6.3.2.jar:na]
	at org.hibernate.tool.schema.internal.exec.GenerationTargetToDatabase.accept(GenerationTargetToDatabase.java:80) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	... 39 common frames omitted

Hibernate:
    drop table if exists showtimes
2025-10-27T11:40:53.786+09:00  WARN 28344 --- [aquaticket-back] [           main] o.h.t.s.i.ExceptionHandlerLoggedImpl     : GenerationTarget encountered exception accepting command : Error executing DDL "
    drop table if exists showtimes" via JDBC [Cannot drop table 'showtimes' referenced by a foreign key constraint 'seat_holds_ibfk_1' on table 'seat_holds'.]

org.hibernate.tool.schema.spi.CommandAcceptanceException: Error executing DDL "
    drop table if exists showtimes" via JDBC [Cannot drop table 'showtimes' referenced by a foreign key constraint 'seat_holds_ibfk_1' on table 'seat_holds'.]
	at org.hibernate.tool.schema.internal.exec.GenerationTargetToDatabase.accept(GenerationTargetToDatabase.java:94) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.Helper.applySqlString(Helper.java:233) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.Helper.applySqlStrings(Helper.java:217) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.dropTables(SchemaDropperImpl.java:384) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.dropConstraintsTablesSequences(SchemaDropperImpl.java:256) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.dropFromMetadata(SchemaDropperImpl.java:218) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.performDrop(SchemaDropperImpl.java:186) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.doDrop(SchemaDropperImpl.java:156) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaDropperImpl.doDrop(SchemaDropperImpl.java:116) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.performDatabaseAction(SchemaManagementToolCoordinator.java:238) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.lambda$process$5(SchemaManagementToolCoordinator.java:144) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at java.base/java.util.HashMap.forEach(HashMap.java:1421) ~[na:na]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.process(SchemaManagementToolCoordinator.java:141) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.boot.internal.SessionFactoryObserverForSchemaExport.sessionFactoryCreated(SessionFactoryObserverForSchemaExport.java:37) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.internal.SessionFactoryObserverChain.sessionFactoryCreated(SessionFactoryObserverChain.java:35) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.internal.SessionFactoryImpl.<init>(SessionFactoryImpl.java:324) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.boot.internal.SessionFactoryBuilderImpl.build(SessionFactoryBuilderImpl.java:463) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.jpa.boot.internal.EntityManagerFactoryBuilderImpl.build(EntityManagerFactoryBuilderImpl.java:1517) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.springframework.orm.jpa.vendor.SpringHibernateJpaPersistenceProvider.createContainerEntityManagerFactory(SpringHibernateJpaPersistenceProvider.java:66) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean.createNativeEntityManagerFactory(LocalContainerEntityManagerFactoryBean.java:390) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.buildNativeEntityManagerFactory(AbstractEntityManagerFactoryBean.java:419) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.afterPropertiesSet(AbstractEntityManagerFactoryBean.java:400) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean.afterPropertiesSet(LocalContainerEntityManagerFactoryBean.java:366) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.invokeInitMethods(AbstractAutowireCapableBeanFactory.java:1873) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1822) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:607) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:529) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:339) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:373) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:337) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:207) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.context.support.AbstractApplicationContext.finishBeanFactoryInitialization(AbstractApplicationContext.java:970) ~[spring-context-6.2.10.jar:6.2.10]
	at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:627) ~[spring-context-6.2.10.jar:6.2.10]
	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.refresh(ServletWebServerApplicationContext.java:146) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.refresh(SpringApplication.java:752) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.refreshContext(SpringApplication.java:439) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:318) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1361) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1350) ~[spring-boot-3.5.5.jar:3.5.5]
	at com.aquaticket.aquaticketback.AquaticketBackApplication.main(AquaticketBackApplication.java:10) ~[main/:na]
Caused by: java.sql.SQLException: Cannot drop table 'showtimes' referenced by a foreign key constraint 'seat_holds_ibfk_1' on table 'seat_holds'.
	at com.mysql.cj.jdbc.exceptions.SQLError.createSQLException(SQLError.java:121) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.exceptions.SQLExceptionsMapping.translateException(SQLExceptionsMapping.java:114) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.StatementImpl.executeInternal(StatementImpl.java:837) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.StatementImpl.execute(StatementImpl.java:685) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.zaxxer.hikari.pool.ProxyStatement.execute(ProxyStatement.java:95) ~[HikariCP-6.3.2.jar:na]
	at com.zaxxer.hikari.pool.HikariProxyStatement.execute(HikariProxyStatement.java) ~[HikariCP-6.3.2.jar:na]
	at org.hibernate.tool.schema.internal.exec.GenerationTargetToDatabase.accept(GenerationTargetToDatabase.java:80) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	... 39 common frames omitted

Hibernate:
    drop table if exists users
Hibernate:
    drop table if exists venues
Hibernate:
    create table performances (
        id bigint not null auto_increment,
        venue_id bigint,
        kopis_id varchar(50),
        poster_url varchar(512),
        title varchar(255) not null,
        primary key (id)
    ) engine=InnoDB
2025-10-27T11:40:53.802+09:00  WARN 28344 --- [aquaticket-back] [           main] o.h.t.s.i.ExceptionHandlerLoggedImpl     : GenerationTarget encountered exception accepting command : Error executing DDL "
    create table performances (
        id bigint not null auto_increment,
        venue_id bigint,
        kopis_id varchar(50),
        poster_url varchar(512),
        title varchar(255) not null,
        primary key (id)
    ) engine=InnoDB" via JDBC [Table 'performances' already exists]

org.hibernate.tool.schema.spi.CommandAcceptanceException: Error executing DDL "
    create table performances (
        id bigint not null auto_increment,
        venue_id bigint,
        kopis_id varchar(50),
        poster_url varchar(512),
        title varchar(255) not null,
        primary key (id)
    ) engine=InnoDB" via JDBC [Table 'performances' already exists]
	at org.hibernate.tool.schema.internal.exec.GenerationTargetToDatabase.accept(GenerationTargetToDatabase.java:94) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.Helper.applySqlString(Helper.java:233) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.Helper.applySqlStrings(Helper.java:217) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.createTables(SchemaCreatorImpl.java:430) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.createSequencesTablesConstraints(SchemaCreatorImpl.java:346) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.createFromMetadata(SchemaCreatorImpl.java:241) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.performCreation(SchemaCreatorImpl.java:174) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.doCreation(SchemaCreatorImpl.java:144) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.doCreation(SchemaCreatorImpl.java:120) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.performDatabaseAction(SchemaManagementToolCoordinator.java:250) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.lambda$process$5(SchemaManagementToolCoordinator.java:144) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at java.base/java.util.HashMap.forEach(HashMap.java:1421) ~[na:na]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.process(SchemaManagementToolCoordinator.java:141) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.boot.internal.SessionFactoryObserverForSchemaExport.sessionFactoryCreated(SessionFactoryObserverForSchemaExport.java:37) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.internal.SessionFactoryObserverChain.sessionFactoryCreated(SessionFactoryObserverChain.java:35) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.internal.SessionFactoryImpl.<init>(SessionFactoryImpl.java:324) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.boot.internal.SessionFactoryBuilderImpl.build(SessionFactoryBuilderImpl.java:463) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.jpa.boot.internal.EntityManagerFactoryBuilderImpl.build(EntityManagerFactoryBuilderImpl.java:1517) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.springframework.orm.jpa.vendor.SpringHibernateJpaPersistenceProvider.createContainerEntityManagerFactory(SpringHibernateJpaPersistenceProvider.java:66) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean.createNativeEntityManagerFactory(LocalContainerEntityManagerFactoryBean.java:390) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.buildNativeEntityManagerFactory(AbstractEntityManagerFactoryBean.java:419) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.afterPropertiesSet(AbstractEntityManagerFactoryBean.java:400) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean.afterPropertiesSet(LocalContainerEntityManagerFactoryBean.java:366) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.invokeInitMethods(AbstractAutowireCapableBeanFactory.java:1873) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1822) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:607) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:529) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:339) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:373) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:337) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:207) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.context.support.AbstractApplicationContext.finishBeanFactoryInitialization(AbstractApplicationContext.java:970) ~[spring-context-6.2.10.jar:6.2.10]
	at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:627) ~[spring-context-6.2.10.jar:6.2.10]
	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.refresh(ServletWebServerApplicationContext.java:146) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.refresh(SpringApplication.java:752) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.refreshContext(SpringApplication.java:439) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:318) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1361) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1350) ~[spring-boot-3.5.5.jar:3.5.5]
	at com.aquaticket.aquaticketback.AquaticketBackApplication.main(AquaticketBackApplication.java:10) ~[main/:na]
Caused by: java.sql.SQLSyntaxErrorException: Table 'performances' already exists
	at com.mysql.cj.jdbc.exceptions.SQLError.createSQLException(SQLError.java:112) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.exceptions.SQLExceptionsMapping.translateException(SQLExceptionsMapping.java:114) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.StatementImpl.executeInternal(StatementImpl.java:837) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.StatementImpl.execute(StatementImpl.java:685) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.zaxxer.hikari.pool.ProxyStatement.execute(ProxyStatement.java:95) ~[HikariCP-6.3.2.jar:na]
	at com.zaxxer.hikari.pool.HikariProxyStatement.execute(HikariProxyStatement.java) ~[HikariCP-6.3.2.jar:na]
	at org.hibernate.tool.schema.internal.exec.GenerationTargetToDatabase.accept(GenerationTargetToDatabase.java:80) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	... 39 common frames omitted

Hibernate:
    create table reservation_seats (
        price integer,
        id bigint not null auto_increment,
        reservation_id bigint not null,
        seat_id bigint not null,
        primary key (id)
    ) engine=InnoDB
Hibernate:
    create table reservations (
        total_price integer,
        confirmed_at datetime(6),
        created_at datetime(6),
        expires_at datetime(6),
        id bigint not null auto_increment,
        show_id bigint,
        showtime_id bigint,
        user_id bigint,
        booking_number varchar(255),
        status varchar(255),
        primary key (id)
    ) engine=InnoDB
2025-10-27T11:40:53.814+09:00  WARN 28344 --- [aquaticket-back] [           main] o.h.t.s.i.ExceptionHandlerLoggedImpl     : GenerationTarget encountered exception accepting command : Error executing DDL "
    create table reservations (
        total_price integer,
        confirmed_at datetime(6),
        created_at datetime(6),
        expires_at datetime(6),
        id bigint not null auto_increment,
        show_id bigint,
        showtime_id bigint,
        user_id bigint,
        booking_number varchar(255),
        status varchar(255),
        primary key (id)
    ) engine=InnoDB" via JDBC [Table 'reservations' already exists]

org.hibernate.tool.schema.spi.CommandAcceptanceException: Error executing DDL "
    create table reservations (
        total_price integer,
        confirmed_at datetime(6),
        created_at datetime(6),
        expires_at datetime(6),
        id bigint not null auto_increment,
        show_id bigint,
        showtime_id bigint,
        user_id bigint,
        booking_number varchar(255),
        status varchar(255),
        primary key (id)
    ) engine=InnoDB" via JDBC [Table 'reservations' already exists]
	at org.hibernate.tool.schema.internal.exec.GenerationTargetToDatabase.accept(GenerationTargetToDatabase.java:94) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.Helper.applySqlString(Helper.java:233) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.Helper.applySqlStrings(Helper.java:217) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.createTables(SchemaCreatorImpl.java:430) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.createSequencesTablesConstraints(SchemaCreatorImpl.java:346) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.createFromMetadata(SchemaCreatorImpl.java:241) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.performCreation(SchemaCreatorImpl.java:174) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.doCreation(SchemaCreatorImpl.java:144) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.doCreation(SchemaCreatorImpl.java:120) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.performDatabaseAction(SchemaManagementToolCoordinator.java:250) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.lambda$process$5(SchemaManagementToolCoordinator.java:144) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at java.base/java.util.HashMap.forEach(HashMap.java:1421) ~[na:na]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.process(SchemaManagementToolCoordinator.java:141) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.boot.internal.SessionFactoryObserverForSchemaExport.sessionFactoryCreated(SessionFactoryObserverForSchemaExport.java:37) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.internal.SessionFactoryObserverChain.sessionFactoryCreated(SessionFactoryObserverChain.java:35) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.internal.SessionFactoryImpl.<init>(SessionFactoryImpl.java:324) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.boot.internal.SessionFactoryBuilderImpl.build(SessionFactoryBuilderImpl.java:463) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.jpa.boot.internal.EntityManagerFactoryBuilderImpl.build(EntityManagerFactoryBuilderImpl.java:1517) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.springframework.orm.jpa.vendor.SpringHibernateJpaPersistenceProvider.createContainerEntityManagerFactory(SpringHibernateJpaPersistenceProvider.java:66) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean.createNativeEntityManagerFactory(LocalContainerEntityManagerFactoryBean.java:390) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.buildNativeEntityManagerFactory(AbstractEntityManagerFactoryBean.java:419) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.afterPropertiesSet(AbstractEntityManagerFactoryBean.java:400) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean.afterPropertiesSet(LocalContainerEntityManagerFactoryBean.java:366) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.invokeInitMethods(AbstractAutowireCapableBeanFactory.java:1873) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1822) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:607) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:529) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:339) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:373) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:337) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:207) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.context.support.AbstractApplicationContext.finishBeanFactoryInitialization(AbstractApplicationContext.java:970) ~[spring-context-6.2.10.jar:6.2.10]
	at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:627) ~[spring-context-6.2.10.jar:6.2.10]
	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.refresh(ServletWebServerApplicationContext.java:146) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.refresh(SpringApplication.java:752) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.refreshContext(SpringApplication.java:439) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:318) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1361) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1350) ~[spring-boot-3.5.5.jar:3.5.5]
	at com.aquaticket.aquaticketback.AquaticketBackApplication.main(AquaticketBackApplication.java:10) ~[main/:na]
Caused by: java.sql.SQLSyntaxErrorException: Table 'reservations' already exists
	at com.mysql.cj.jdbc.exceptions.SQLError.createSQLException(SQLError.java:112) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.exceptions.SQLExceptionsMapping.translateException(SQLExceptionsMapping.java:114) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.StatementImpl.executeInternal(StatementImpl.java:837) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.StatementImpl.execute(StatementImpl.java:685) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.zaxxer.hikari.pool.ProxyStatement.execute(ProxyStatement.java:95) ~[HikariCP-6.3.2.jar:na]
	at com.zaxxer.hikari.pool.HikariProxyStatement.execute(HikariProxyStatement.java) ~[HikariCP-6.3.2.jar:na]
	at org.hibernate.tool.schema.internal.exec.GenerationTargetToDatabase.accept(GenerationTargetToDatabase.java:80) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	... 39 common frames omitted

Hibernate:
    create table seat_locks (
        id bigint not null auto_increment,
        locked_until datetime(6),
        reservation_id bigint,
        seat_id bigint,
        show_id bigint,
        primary key (id)
    ) engine=InnoDB
Hibernate:
    create table seats (
        price integer not null,
        seat_no integer not null,
        id bigint not null auto_increment,
        venue_id bigint not null,
        row_label varchar(10) not null,
        primary key (id)
    ) engine=InnoDB
2025-10-27T11:40:53.824+09:00  WARN 28344 --- [aquaticket-back] [           main] o.h.t.s.i.ExceptionHandlerLoggedImpl     : GenerationTarget encountered exception accepting command : Error executing DDL "
    create table seats (
        price integer not null,
        seat_no integer not null,
        id bigint not null auto_increment,
        venue_id bigint not null,
        row_label varchar(10) not null,
        primary key (id)
    ) engine=InnoDB" via JDBC [Table 'seats' already exists]

org.hibernate.tool.schema.spi.CommandAcceptanceException: Error executing DDL "
    create table seats (
        price integer not null,
        seat_no integer not null,
        id bigint not null auto_increment,
        venue_id bigint not null,
        row_label varchar(10) not null,
        primary key (id)
    ) engine=InnoDB" via JDBC [Table 'seats' already exists]
	at org.hibernate.tool.schema.internal.exec.GenerationTargetToDatabase.accept(GenerationTargetToDatabase.java:94) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.Helper.applySqlString(Helper.java:233) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.Helper.applySqlStrings(Helper.java:217) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.createTables(SchemaCreatorImpl.java:430) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.createSequencesTablesConstraints(SchemaCreatorImpl.java:346) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.createFromMetadata(SchemaCreatorImpl.java:241) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.performCreation(SchemaCreatorImpl.java:174) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.doCreation(SchemaCreatorImpl.java:144) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.doCreation(SchemaCreatorImpl.java:120) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.performDatabaseAction(SchemaManagementToolCoordinator.java:250) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.lambda$process$5(SchemaManagementToolCoordinator.java:144) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at java.base/java.util.HashMap.forEach(HashMap.java:1421) ~[na:na]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.process(SchemaManagementToolCoordinator.java:141) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.boot.internal.SessionFactoryObserverForSchemaExport.sessionFactoryCreated(SessionFactoryObserverForSchemaExport.java:37) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.internal.SessionFactoryObserverChain.sessionFactoryCreated(SessionFactoryObserverChain.java:35) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.internal.SessionFactoryImpl.<init>(SessionFactoryImpl.java:324) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.boot.internal.SessionFactoryBuilderImpl.build(SessionFactoryBuilderImpl.java:463) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.jpa.boot.internal.EntityManagerFactoryBuilderImpl.build(EntityManagerFactoryBuilderImpl.java:1517) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.springframework.orm.jpa.vendor.SpringHibernateJpaPersistenceProvider.createContainerEntityManagerFactory(SpringHibernateJpaPersistenceProvider.java:66) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean.createNativeEntityManagerFactory(LocalContainerEntityManagerFactoryBean.java:390) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.buildNativeEntityManagerFactory(AbstractEntityManagerFactoryBean.java:419) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.afterPropertiesSet(AbstractEntityManagerFactoryBean.java:400) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean.afterPropertiesSet(LocalContainerEntityManagerFactoryBean.java:366) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.invokeInitMethods(AbstractAutowireCapableBeanFactory.java:1873) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1822) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:607) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:529) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:339) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:373) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:337) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:207) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.context.support.AbstractApplicationContext.finishBeanFactoryInitialization(AbstractApplicationContext.java:970) ~[spring-context-6.2.10.jar:6.2.10]
	at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:627) ~[spring-context-6.2.10.jar:6.2.10]
	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.refresh(ServletWebServerApplicationContext.java:146) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.refresh(SpringApplication.java:752) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.refreshContext(SpringApplication.java:439) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:318) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1361) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1350) ~[spring-boot-3.5.5.jar:3.5.5]
	at com.aquaticket.aquaticketback.AquaticketBackApplication.main(AquaticketBackApplication.java:10) ~[main/:na]
Caused by: java.sql.SQLSyntaxErrorException: Table 'seats' already exists
	at com.mysql.cj.jdbc.exceptions.SQLError.createSQLException(SQLError.java:112) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.exceptions.SQLExceptionsMapping.translateException(SQLExceptionsMapping.java:114) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.StatementImpl.executeInternal(StatementImpl.java:837) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.StatementImpl.execute(StatementImpl.java:685) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.zaxxer.hikari.pool.ProxyStatement.execute(ProxyStatement.java:95) ~[HikariCP-6.3.2.jar:na]
	at com.zaxxer.hikari.pool.HikariProxyStatement.execute(HikariProxyStatement.java) ~[HikariCP-6.3.2.jar:na]
	at org.hibernate.tool.schema.internal.exec.GenerationTargetToDatabase.accept(GenerationTargetToDatabase.java:80) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	... 39 common frames omitted

Hibernate:
    create table shows (
        id bigint not null auto_increment,
        performance_id bigint not null,
        starts_at datetime(6) not null,
        kopis_id varchar(255) not null,
        primary key (id)
    ) engine=InnoDB
2025-10-27T11:40:53.826+09:00  WARN 28344 --- [aquaticket-back] [           main] o.h.t.s.i.ExceptionHandlerLoggedImpl     : GenerationTarget encountered exception accepting command : Error executing DDL "
    create table shows (
        id bigint not null auto_increment,
        performance_id bigint not null,
        starts_at datetime(6) not null,
        kopis_id varchar(255) not null,
        primary key (id)
    ) engine=InnoDB" via JDBC [Table 'shows' already exists]

org.hibernate.tool.schema.spi.CommandAcceptanceException: Error executing DDL "
    create table shows (
        id bigint not null auto_increment,
        performance_id bigint not null,
        starts_at datetime(6) not null,
        kopis_id varchar(255) not null,
        primary key (id)
    ) engine=InnoDB" via JDBC [Table 'shows' already exists]
	at org.hibernate.tool.schema.internal.exec.GenerationTargetToDatabase.accept(GenerationTargetToDatabase.java:94) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.Helper.applySqlString(Helper.java:233) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.Helper.applySqlStrings(Helper.java:217) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.createTables(SchemaCreatorImpl.java:430) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.createSequencesTablesConstraints(SchemaCreatorImpl.java:346) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.createFromMetadata(SchemaCreatorImpl.java:241) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.performCreation(SchemaCreatorImpl.java:174) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.doCreation(SchemaCreatorImpl.java:144) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.doCreation(SchemaCreatorImpl.java:120) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.performDatabaseAction(SchemaManagementToolCoordinator.java:250) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.lambda$process$5(SchemaManagementToolCoordinator.java:144) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at java.base/java.util.HashMap.forEach(HashMap.java:1421) ~[na:na]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.process(SchemaManagementToolCoordinator.java:141) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.boot.internal.SessionFactoryObserverForSchemaExport.sessionFactoryCreated(SessionFactoryObserverForSchemaExport.java:37) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.internal.SessionFactoryObserverChain.sessionFactoryCreated(SessionFactoryObserverChain.java:35) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.internal.SessionFactoryImpl.<init>(SessionFactoryImpl.java:324) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.boot.internal.SessionFactoryBuilderImpl.build(SessionFactoryBuilderImpl.java:463) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.jpa.boot.internal.EntityManagerFactoryBuilderImpl.build(EntityManagerFactoryBuilderImpl.java:1517) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.springframework.orm.jpa.vendor.SpringHibernateJpaPersistenceProvider.createContainerEntityManagerFactory(SpringHibernateJpaPersistenceProvider.java:66) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean.createNativeEntityManagerFactory(LocalContainerEntityManagerFactoryBean.java:390) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.buildNativeEntityManagerFactory(AbstractEntityManagerFactoryBean.java:419) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.afterPropertiesSet(AbstractEntityManagerFactoryBean.java:400) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean.afterPropertiesSet(LocalContainerEntityManagerFactoryBean.java:366) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.invokeInitMethods(AbstractAutowireCapableBeanFactory.java:1873) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1822) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:607) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:529) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:339) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:373) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:337) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:207) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.context.support.AbstractApplicationContext.finishBeanFactoryInitialization(AbstractApplicationContext.java:970) ~[spring-context-6.2.10.jar:6.2.10]
	at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:627) ~[spring-context-6.2.10.jar:6.2.10]
	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.refresh(ServletWebServerApplicationContext.java:146) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.refresh(SpringApplication.java:752) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.refreshContext(SpringApplication.java:439) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:318) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1361) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1350) ~[spring-boot-3.5.5.jar:3.5.5]
	at com.aquaticket.aquaticketback.AquaticketBackApplication.main(AquaticketBackApplication.java:10) ~[main/:na]
Caused by: java.sql.SQLSyntaxErrorException: Table 'shows' already exists
	at com.mysql.cj.jdbc.exceptions.SQLError.createSQLException(SQLError.java:112) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.exceptions.SQLExceptionsMapping.translateException(SQLExceptionsMapping.java:114) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.StatementImpl.executeInternal(StatementImpl.java:837) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.StatementImpl.execute(StatementImpl.java:685) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.zaxxer.hikari.pool.ProxyStatement.execute(ProxyStatement.java:95) ~[HikariCP-6.3.2.jar:na]
	at com.zaxxer.hikari.pool.HikariProxyStatement.execute(HikariProxyStatement.java) ~[HikariCP-6.3.2.jar:na]
	at org.hibernate.tool.schema.internal.exec.GenerationTargetToDatabase.accept(GenerationTargetToDatabase.java:80) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	... 39 common frames omitted

Hibernate:
    create table showtimes (
        id bigint not null auto_increment,
        show_id bigint not null,
        start_at datetime(6) not null,
        kopis_id varchar(255) not null,
        primary key (id)
    ) engine=InnoDB
2025-10-27T11:40:53.827+09:00  WARN 28344 --- [aquaticket-back] [           main] o.h.t.s.i.ExceptionHandlerLoggedImpl     : GenerationTarget encountered exception accepting command : Error executing DDL "
    create table showtimes (
        id bigint not null auto_increment,
        show_id bigint not null,
        start_at datetime(6) not null,
        kopis_id varchar(255) not null,
        primary key (id)
    ) engine=InnoDB" via JDBC [Table 'showtimes' already exists]

org.hibernate.tool.schema.spi.CommandAcceptanceException: Error executing DDL "
    create table showtimes (
        id bigint not null auto_increment,
        show_id bigint not null,
        start_at datetime(6) not null,
        kopis_id varchar(255) not null,
        primary key (id)
    ) engine=InnoDB" via JDBC [Table 'showtimes' already exists]
	at org.hibernate.tool.schema.internal.exec.GenerationTargetToDatabase.accept(GenerationTargetToDatabase.java:94) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.Helper.applySqlString(Helper.java:233) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.Helper.applySqlStrings(Helper.java:217) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.createTables(SchemaCreatorImpl.java:430) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.createSequencesTablesConstraints(SchemaCreatorImpl.java:346) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.createFromMetadata(SchemaCreatorImpl.java:241) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.performCreation(SchemaCreatorImpl.java:174) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.doCreation(SchemaCreatorImpl.java:144) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.doCreation(SchemaCreatorImpl.java:120) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.performDatabaseAction(SchemaManagementToolCoordinator.java:250) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.lambda$process$5(SchemaManagementToolCoordinator.java:144) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at java.base/java.util.HashMap.forEach(HashMap.java:1421) ~[na:na]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.process(SchemaManagementToolCoordinator.java:141) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.boot.internal.SessionFactoryObserverForSchemaExport.sessionFactoryCreated(SessionFactoryObserverForSchemaExport.java:37) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.internal.SessionFactoryObserverChain.sessionFactoryCreated(SessionFactoryObserverChain.java:35) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.internal.SessionFactoryImpl.<init>(SessionFactoryImpl.java:324) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.boot.internal.SessionFactoryBuilderImpl.build(SessionFactoryBuilderImpl.java:463) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.jpa.boot.internal.EntityManagerFactoryBuilderImpl.build(EntityManagerFactoryBuilderImpl.java:1517) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.springframework.orm.jpa.vendor.SpringHibernateJpaPersistenceProvider.createContainerEntityManagerFactory(SpringHibernateJpaPersistenceProvider.java:66) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean.createNativeEntityManagerFactory(LocalContainerEntityManagerFactoryBean.java:390) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.buildNativeEntityManagerFactory(AbstractEntityManagerFactoryBean.java:419) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.afterPropertiesSet(AbstractEntityManagerFactoryBean.java:400) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean.afterPropertiesSet(LocalContainerEntityManagerFactoryBean.java:366) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.invokeInitMethods(AbstractAutowireCapableBeanFactory.java:1873) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1822) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:607) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:529) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:339) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:373) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:337) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:207) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.context.support.AbstractApplicationContext.finishBeanFactoryInitialization(AbstractApplicationContext.java:970) ~[spring-context-6.2.10.jar:6.2.10]
	at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:627) ~[spring-context-6.2.10.jar:6.2.10]
	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.refresh(ServletWebServerApplicationContext.java:146) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.refresh(SpringApplication.java:752) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.refreshContext(SpringApplication.java:439) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:318) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1361) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1350) ~[spring-boot-3.5.5.jar:3.5.5]
	at com.aquaticket.aquaticketback.AquaticketBackApplication.main(AquaticketBackApplication.java:10) ~[main/:na]
Caused by: java.sql.SQLSyntaxErrorException: Table 'showtimes' already exists
	at com.mysql.cj.jdbc.exceptions.SQLError.createSQLException(SQLError.java:112) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.exceptions.SQLExceptionsMapping.translateException(SQLExceptionsMapping.java:114) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.StatementImpl.executeInternal(StatementImpl.java:837) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.StatementImpl.execute(StatementImpl.java:685) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.zaxxer.hikari.pool.ProxyStatement.execute(ProxyStatement.java:95) ~[HikariCP-6.3.2.jar:na]
	at com.zaxxer.hikari.pool.HikariProxyStatement.execute(HikariProxyStatement.java) ~[HikariCP-6.3.2.jar:na]
	at org.hibernate.tool.schema.internal.exec.GenerationTargetToDatabase.accept(GenerationTargetToDatabase.java:80) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	... 39 common frames omitted

Hibernate:
    create table users (
        id bigint not null auto_increment,
        phone varchar(20),
        role varchar(20) not null,
        name varchar(50) not null,
        nickname varchar(50),
        password_hash varchar(60),
        email varchar(120) not null,
        provider varchar(255),
        provider_id varchar(255),
        primary key (id)
    ) engine=InnoDB
Hibernate:
    create table venues (
        id bigint not null auto_increment,
        name varchar(150) not null,
        address varchar(255),
        primary key (id)
    ) engine=InnoDB
Hibernate:
    alter table performances
       add constraint UKh8r68j5rdcg4ehyic1bxq5jgw unique (kopis_id)
Hibernate:
    alter table reservations
       add constraint UKaklqbvdhot52s3qfg0l80b4se unique (booking_number)
2025-10-27T11:40:53.858+09:00  WARN 28344 --- [aquaticket-back] [           main] o.h.t.s.i.ExceptionHandlerLoggedImpl     : GenerationTarget encountered exception accepting command : Error executing DDL "
    alter table reservations
       add constraint UKaklqbvdhot52s3qfg0l80b4se unique (booking_number)" via JDBC [Duplicate key name 'UKaklqbvdhot52s3qfg0l80b4se']

org.hibernate.tool.schema.spi.CommandAcceptanceException: Error executing DDL "
    alter table reservations
       add constraint UKaklqbvdhot52s3qfg0l80b4se unique (booking_number)" via JDBC [Duplicate key name 'UKaklqbvdhot52s3qfg0l80b4se']
	at org.hibernate.tool.schema.internal.exec.GenerationTargetToDatabase.accept(GenerationTargetToDatabase.java:94) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.Helper.applySqlString(Helper.java:233) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.Helper.applySqlStrings(Helper.java:217) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.createTableConstraints(SchemaCreatorImpl.java:402) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.createSequencesTablesConstraints(SchemaCreatorImpl.java:358) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.createFromMetadata(SchemaCreatorImpl.java:241) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.performCreation(SchemaCreatorImpl.java:174) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.doCreation(SchemaCreatorImpl.java:144) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.doCreation(SchemaCreatorImpl.java:120) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.performDatabaseAction(SchemaManagementToolCoordinator.java:250) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.lambda$process$5(SchemaManagementToolCoordinator.java:144) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at java.base/java.util.HashMap.forEach(HashMap.java:1421) ~[na:na]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.process(SchemaManagementToolCoordinator.java:141) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.boot.internal.SessionFactoryObserverForSchemaExport.sessionFactoryCreated(SessionFactoryObserverForSchemaExport.java:37) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.internal.SessionFactoryObserverChain.sessionFactoryCreated(SessionFactoryObserverChain.java:35) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.internal.SessionFactoryImpl.<init>(SessionFactoryImpl.java:324) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.boot.internal.SessionFactoryBuilderImpl.build(SessionFactoryBuilderImpl.java:463) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.jpa.boot.internal.EntityManagerFactoryBuilderImpl.build(EntityManagerFactoryBuilderImpl.java:1517) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.springframework.orm.jpa.vendor.SpringHibernateJpaPersistenceProvider.createContainerEntityManagerFactory(SpringHibernateJpaPersistenceProvider.java:66) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean.createNativeEntityManagerFactory(LocalContainerEntityManagerFactoryBean.java:390) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.buildNativeEntityManagerFactory(AbstractEntityManagerFactoryBean.java:419) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.afterPropertiesSet(AbstractEntityManagerFactoryBean.java:400) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean.afterPropertiesSet(LocalContainerEntityManagerFactoryBean.java:366) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.invokeInitMethods(AbstractAutowireCapableBeanFactory.java:1873) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1822) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:607) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:529) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:339) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:373) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:337) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:207) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.context.support.AbstractApplicationContext.finishBeanFactoryInitialization(AbstractApplicationContext.java:970) ~[spring-context-6.2.10.jar:6.2.10]
	at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:627) ~[spring-context-6.2.10.jar:6.2.10]
	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.refresh(ServletWebServerApplicationContext.java:146) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.refresh(SpringApplication.java:752) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.refreshContext(SpringApplication.java:439) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:318) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1361) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1350) ~[spring-boot-3.5.5.jar:3.5.5]
	at com.aquaticket.aquaticketback.AquaticketBackApplication.main(AquaticketBackApplication.java:10) ~[main/:na]
Caused by: java.sql.SQLSyntaxErrorException: Duplicate key name 'UKaklqbvdhot52s3qfg0l80b4se'
	at com.mysql.cj.jdbc.exceptions.SQLError.createSQLException(SQLError.java:112) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.exceptions.SQLExceptionsMapping.translateException(SQLExceptionsMapping.java:114) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.StatementImpl.executeInternal(StatementImpl.java:837) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.StatementImpl.execute(StatementImpl.java:685) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.zaxxer.hikari.pool.ProxyStatement.execute(ProxyStatement.java:95) ~[HikariCP-6.3.2.jar:na]
	at com.zaxxer.hikari.pool.HikariProxyStatement.execute(HikariProxyStatement.java) ~[HikariCP-6.3.2.jar:na]
	at org.hibernate.tool.schema.internal.exec.GenerationTargetToDatabase.accept(GenerationTargetToDatabase.java:80) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	... 39 common frames omitted

Hibernate:
    create index idx_showtime_show
       on showtimes (show_id)
2025-10-27T11:40:53.861+09:00  WARN 28344 --- [aquaticket-back] [           main] o.h.t.s.i.ExceptionHandlerLoggedImpl     : GenerationTarget encountered exception accepting command : Error executing DDL "
    create index idx_showtime_show
       on showtimes (show_id)" via JDBC [Duplicate key name 'idx_showtime_show']

org.hibernate.tool.schema.spi.CommandAcceptanceException: Error executing DDL "
    create index idx_showtime_show
       on showtimes (show_id)" via JDBC [Duplicate key name 'idx_showtime_show']
	at org.hibernate.tool.schema.internal.exec.GenerationTargetToDatabase.accept(GenerationTargetToDatabase.java:94) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.Helper.applySqlString(Helper.java:233) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.Helper.applySqlStrings(Helper.java:217) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.createTableConstraints(SchemaCreatorImpl.java:392) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.createSequencesTablesConstraints(SchemaCreatorImpl.java:358) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.createFromMetadata(SchemaCreatorImpl.java:241) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.performCreation(SchemaCreatorImpl.java:174) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.doCreation(SchemaCreatorImpl.java:144) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.doCreation(SchemaCreatorImpl.java:120) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.performDatabaseAction(SchemaManagementToolCoordinator.java:250) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.lambda$process$5(SchemaManagementToolCoordinator.java:144) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at java.base/java.util.HashMap.forEach(HashMap.java:1421) ~[na:na]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.process(SchemaManagementToolCoordinator.java:141) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.boot.internal.SessionFactoryObserverForSchemaExport.sessionFactoryCreated(SessionFactoryObserverForSchemaExport.java:37) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.internal.SessionFactoryObserverChain.sessionFactoryCreated(SessionFactoryObserverChain.java:35) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.internal.SessionFactoryImpl.<init>(SessionFactoryImpl.java:324) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.boot.internal.SessionFactoryBuilderImpl.build(SessionFactoryBuilderImpl.java:463) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.jpa.boot.internal.EntityManagerFactoryBuilderImpl.build(EntityManagerFactoryBuilderImpl.java:1517) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.springframework.orm.jpa.vendor.SpringHibernateJpaPersistenceProvider.createContainerEntityManagerFactory(SpringHibernateJpaPersistenceProvider.java:66) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean.createNativeEntityManagerFactory(LocalContainerEntityManagerFactoryBean.java:390) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.buildNativeEntityManagerFactory(AbstractEntityManagerFactoryBean.java:419) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.afterPropertiesSet(AbstractEntityManagerFactoryBean.java:400) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean.afterPropertiesSet(LocalContainerEntityManagerFactoryBean.java:366) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.invokeInitMethods(AbstractAutowireCapableBeanFactory.java:1873) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1822) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:607) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:529) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:339) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:373) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:337) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:207) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.context.support.AbstractApplicationContext.finishBeanFactoryInitialization(AbstractApplicationContext.java:970) ~[spring-context-6.2.10.jar:6.2.10]
	at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:627) ~[spring-context-6.2.10.jar:6.2.10]
	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.refresh(ServletWebServerApplicationContext.java:146) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.refresh(SpringApplication.java:752) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.refreshContext(SpringApplication.java:439) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:318) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1361) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1350) ~[spring-boot-3.5.5.jar:3.5.5]
	at com.aquaticket.aquaticketback.AquaticketBackApplication.main(AquaticketBackApplication.java:10) ~[main/:na]
Caused by: java.sql.SQLSyntaxErrorException: Duplicate key name 'idx_showtime_show'
	at com.mysql.cj.jdbc.exceptions.SQLError.createSQLException(SQLError.java:112) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.exceptions.SQLExceptionsMapping.translateException(SQLExceptionsMapping.java:114) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.StatementImpl.executeInternal(StatementImpl.java:837) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.StatementImpl.execute(StatementImpl.java:685) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.zaxxer.hikari.pool.ProxyStatement.execute(ProxyStatement.java:95) ~[HikariCP-6.3.2.jar:na]
	at com.zaxxer.hikari.pool.HikariProxyStatement.execute(HikariProxyStatement.java) ~[HikariCP-6.3.2.jar:na]
	at org.hibernate.tool.schema.internal.exec.GenerationTargetToDatabase.accept(GenerationTargetToDatabase.java:80) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	... 39 common frames omitted

Hibernate:
    create index idx_showtime_start_at
       on showtimes (start_at)
2025-10-27T11:40:53.862+09:00  WARN 28344 --- [aquaticket-back] [           main] o.h.t.s.i.ExceptionHandlerLoggedImpl     : GenerationTarget encountered exception accepting command : Error executing DDL "
    create index idx_showtime_start_at
       on showtimes (start_at)" via JDBC [Duplicate key name 'idx_showtime_start_at']

org.hibernate.tool.schema.spi.CommandAcceptanceException: Error executing DDL "
    create index idx_showtime_start_at
       on showtimes (start_at)" via JDBC [Duplicate key name 'idx_showtime_start_at']
	at org.hibernate.tool.schema.internal.exec.GenerationTargetToDatabase.accept(GenerationTargetToDatabase.java:94) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.Helper.applySqlString(Helper.java:233) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.Helper.applySqlStrings(Helper.java:217) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.createTableConstraints(SchemaCreatorImpl.java:392) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.createSequencesTablesConstraints(SchemaCreatorImpl.java:358) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.createFromMetadata(SchemaCreatorImpl.java:241) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.performCreation(SchemaCreatorImpl.java:174) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.doCreation(SchemaCreatorImpl.java:144) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.internal.SchemaCreatorImpl.doCreation(SchemaCreatorImpl.java:120) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.performDatabaseAction(SchemaManagementToolCoordinator.java:250) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.lambda$process$5(SchemaManagementToolCoordinator.java:144) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at java.base/java.util.HashMap.forEach(HashMap.java:1421) ~[na:na]
	at org.hibernate.tool.schema.spi.SchemaManagementToolCoordinator.process(SchemaManagementToolCoordinator.java:141) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.boot.internal.SessionFactoryObserverForSchemaExport.sessionFactoryCreated(SessionFactoryObserverForSchemaExport.java:37) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.internal.SessionFactoryObserverChain.sessionFactoryCreated(SessionFactoryObserverChain.java:35) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.internal.SessionFactoryImpl.<init>(SessionFactoryImpl.java:324) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.boot.internal.SessionFactoryBuilderImpl.build(SessionFactoryBuilderImpl.java:463) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.hibernate.jpa.boot.internal.EntityManagerFactoryBuilderImpl.build(EntityManagerFactoryBuilderImpl.java:1517) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	at org.springframework.orm.jpa.vendor.SpringHibernateJpaPersistenceProvider.createContainerEntityManagerFactory(SpringHibernateJpaPersistenceProvider.java:66) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean.createNativeEntityManagerFactory(LocalContainerEntityManagerFactoryBean.java:390) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.buildNativeEntityManagerFactory(AbstractEntityManagerFactoryBean.java:419) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.AbstractEntityManagerFactoryBean.afterPropertiesSet(AbstractEntityManagerFactoryBean.java:400) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean.afterPropertiesSet(LocalContainerEntityManagerFactoryBean.java:366) ~[spring-orm-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.invokeInitMethods(AbstractAutowireCapableBeanFactory.java:1873) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.initializeBean(AbstractAutowireCapableBeanFactory.java:1822) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:607) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:529) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:339) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:373) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:337) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:207) ~[spring-beans-6.2.10.jar:6.2.10]
	at org.springframework.context.support.AbstractApplicationContext.finishBeanFactoryInitialization(AbstractApplicationContext.java:970) ~[spring-context-6.2.10.jar:6.2.10]
	at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:627) ~[spring-context-6.2.10.jar:6.2.10]
	at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.refresh(ServletWebServerApplicationContext.java:146) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.refresh(SpringApplication.java:752) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.refreshContext(SpringApplication.java:439) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:318) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1361) ~[spring-boot-3.5.5.jar:3.5.5]
	at org.springframework.boot.SpringApplication.run(SpringApplication.java:1350) ~[spring-boot-3.5.5.jar:3.5.5]
	at com.aquaticket.aquaticketback.AquaticketBackApplication.main(AquaticketBackApplication.java:10) ~[main/:na]
Caused by: java.sql.SQLSyntaxErrorException: Duplicate key name 'idx_showtime_start_at'
	at com.mysql.cj.jdbc.exceptions.SQLError.createSQLException(SQLError.java:112) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.exceptions.SQLExceptionsMapping.translateException(SQLExceptionsMapping.java:114) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.StatementImpl.executeInternal(StatementImpl.java:837) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.mysql.cj.jdbc.StatementImpl.execute(StatementImpl.java:685) ~[mysql-connector-j-9.4.0.jar:9.4.0]
	at com.zaxxer.hikari.pool.ProxyStatement.execute(ProxyStatement.java:95) ~[HikariCP-6.3.2.jar:na]
	at com.zaxxer.hikari.pool.HikariProxyStatement.execute(HikariProxyStatement.java) ~[HikariCP-6.3.2.jar:na]
	at org.hibernate.tool.schema.internal.exec.GenerationTargetToDatabase.accept(GenerationTargetToDatabase.java:80) ~[hibernate-core-6.6.26.Final.jar:6.6.26.Final]
	... 39 common frames omitted

Hibernate:
    alter table users
       add constraint UK6dotkott2kjsp8vw4d0m25fb7 unique (email)
Hibernate:
    alter table performances
       add constraint FKjl9p341hkh5talqet9d09p3mi
       foreign key (venue_id)
       references venues (id)
Hibernate:
    alter table reservation_seats
       add constraint FK755roqq37bto59vxaxis9x3nt
       foreign key (reservation_id)
       references reservations (id)
Hibernate:
    alter table reservation_seats
       add constraint FKo4tbgy4jg06hfaugqx2gxx9we
       foreign key (seat_id)
       references seats (id)
Hibernate:
    alter table reservations
       add constraint FKq768uevy4c6ji14lhuwxlcj5l
       foreign key (show_id)
       references shows (id)
Hibernate:
    alter table reservations
       add constraint FKddwb0eaoaescreoyp9gpmttbb
       foreign key (showtime_id)
       references showtimes (id)
Hibernate:
    alter table reservations
       add constraint FKb5g9io5h54iwl2inkno50ppln
       foreign key (user_id)
       references users (id)
Hibernate:
    alter table seat_locks
       add constraint FK3gu7p6phtcueo8j8vgl2ggcur
       foreign key (reservation_id)
       references reservations (id)
Hibernate:
    alter table seat_locks
       add constraint FK6mhk56depph9dpx6en00b0neg
       foreign key (seat_id)
       references seats (id)
Hibernate:
    alter table seat_locks
       add constraint FK6cxw0lm7tl4sh0ayr7ux3rkoc
       foreign key (show_id)
       references shows (id)
Hibernate:
    alter table seats
       add constraint FKfahhtb0bb0u1wcnqqys0iehmo
       foreign key (venue_id)
       references venues (id)
Hibernate:
    alter table shows
       add constraint FKc3fb3hjccbxy073kvrremssj2
       foreign key (performance_id)
       references performances (id)
Hibernate:
    alter table showtimes
       add constraint FK7u61cv5se2cicmvs5j8412tg8
       foreign key (show_id)
       references shows (id)
2025-10-27T11:40:54.374+09:00  INFO 28344 --- [aquaticket-back] [           main] j.LocalContainerEntityManagerFactoryBean : Initialized JPA EntityManagerFactory for persistence unit 'default'
2025-10-27T11:40:54.670+09:00  WARN 28344 --- [aquaticket-back] [           main] JpaBaseConfiguration$JpaWebConfiguration : spring.jpa.open-in-view is enabled by default. Therefore, database queries may be performed during view rendering. Explicitly configure spring.jpa.open-in-view to disable this warning
2025-10-27T11:40:54.994+09:00  INFO 28344 --- [aquaticket-back] [           main] o.s.d.j.r.query.QueryEnhancerFactory     : Hibernate is in classpath; If applicable, HQL parser will be used.
2025-10-27T11:40:55.251+09:00  INFO 28344 --- [aquaticket-back] [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port 8080 (http) with context path '/'
2025-10-27T11:40:55.256+09:00  INFO 28344 --- [aquaticket-back] [           main] c.a.a.AquaticketBackApplication          : Started AquaticketBackApplication in 3.754 seconds (process running for 4.085)
