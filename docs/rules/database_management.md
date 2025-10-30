# 데이터베이스 관리 방법

이 문서는 Gemini 에이전트가 `aquaticket` 프로젝트의 MySQL 데이터베이스를 관리하는 방법을 정리합니다.

## 1. 데이터베이스 접속 도구

-   **도구:** `mysql.exe` 명령줄 클라이언트
-   **경로:** `C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe`

## 2. 접속 정보 (Credentials)

-   데이터베이스 접속에 필요한 정보(URL, 사용자 이름, 비밀번호)는 백엔드 프로젝트의 설정 파일에 저장되어 있습니다.
-   **설정 파일 위치:** `C:\aquaticket\aquaticket-back\src\main\resources\application.properties`

## 3. 명령어 실행 방법

-   위의 도구와 접속 정보를 조합하여 `run_shell_command`를 통해 SQL 쿼리를 실행합니다.
-   **명령어 예시:**
    ```powershell
    & 'C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe' -u [사용자이름] -p[비밀번호] -D [데이터베이스명] -e "[SQL 쿼리]"
    ```
-   **실제 예시 (데이터베이스 목록 확인):**
    ```powershell
    & 'C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe' -u aqua -p'aqua1234' -D aquaticket -e 'SHOW DATABASES;'
    ```
