# webdev-form
Hej,
Oto moja propozycja formularza kontaktowego.
Ponieważ otrzymałam dowolność doboru narzędzi oraz dużo czasu na jego implementację, postanowiłam wykorzystać go do końca,
nie ograniczając się do najprostszej metody realizacji (HTML + PHP) i nieco utrudniając sobie zadanie, dzięki czemu stało się 
dla mnie wyzwaniem i możliwością sprawdzenia swych sił. Jednocześnie nie chciałam zbytnio komplikować tak niewielkiego zagadnienia,
stosowanie zbyt wielu frameworków i narzędzi wydało mi się zbędne i nieużyteczne - będąc prostsze, może być łatwiej wykorzystane
w różnych systemach, opierających się na odrębnych frameworkach.

Formularz wykorzystuje bazę danych MySQL, która nie jest dołączona do repozytorium. Dane konfiguracyjne wyglądają następująco:
nazwa bazy danych: form_submissions
charset: utf8
host: localhost
użytkownik: root
hasło:
tabela: submissions
kolumny tabeli: id (INT, AUTO_INCREMENT, klucz główny), Name (TEXT), Email (TEXT), Enquiry (TEXT)

Po stronie backendowej wykorzystany został czysty PHP. Komunikacja z bazą danych odbywa się za pomocą PHP Data Obejcts, natomiast
dane są uprzednio manualnie wyczyszczone z potencjalnie niebezpiecznych tagów za pomocą funkcji PHP. Obie te metody służą
zwiększeniu bezpieczeństwa i zapobiegnięciu atakom.

Warstwę frontendową wykonałam przy użyciu VueJS. Powody takiego wyboru:
- Vue jest używany w firmie, chciałam więc spróbować swoich sił w tej technologii. Dzięki temu również ja mogłam się przekonać,
jak pracuje mi się z wykorzystywanymi przez Was technologiami.
- Dopiero się uczę Vue, więc była to świetna okazja do zastosowania zdobytej wiedzy w praktyce
- Uznałam Vue za idealnie nadający się do zwiększenia atrakcyjności i użyteczności aplikacji, dzięki animacjom i walidacji
odbywającej się w czasie rzeczywistym. Użytkownik jeszcze przez wysłaniem formularza wie, czy prawidłowo wypełnił wszystkie
pola, więc dane nie zostają wysłane na serwer, zanim nie będą poprawne.

Komunikacja pomiędzy Vue a PHP odbywa się za pomocą biblioteki axios.

PHP wykorzystuje funkcję mail() do wysyłania potwierdzenia na adres e-mail, która ma to do siebie, że może nie działać 
na localhost, jeśli brakuje odpowiedniej konfiguracji serwera.

Jak już wspomniałam, starałam się wykorzystać dany czas nie tylko na to, aby jak najszybciej wykonać zadanie,
ale również żeby zrobić je jak najlepiej i jak najwięcej wiedzy z niego uzyskać. Największym wyzwaniem było dla mnie skomunikowanie
warstwy frontendowej z backendową.
To było ciekawe wyzwanie, które przy okazji conieco mnie nauczyło. Dziękuję za tę szansę :)
