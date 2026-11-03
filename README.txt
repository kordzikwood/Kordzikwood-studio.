KORDZIKWOOD Studio 5.0 — wersja testowa (integracja z 4.3)

INSTALACJA GITHUB PAGES
1. Zrób kopię dotychczasowych plików i eksport najważniejszych projektów .kwd.
2. Rozpakuj ZIP i prześlij WSZYSTKIE 8 plików do głównego katalogu repozytorium GitHub (gałąź main), zastępując stare pliki.
3. Odczekaj na publikację GitHub Pages, odśwież stronę. W razie potrzeby zamknij starą kartę lub uruchom aplikację ponownie (nowy cache v500).
4. Nie czyść danych witryny w Safari: lokalne projekty i tekstury są przechowywane w pamięci przeglądarki.

CO NOWE
- Interaktywny rzut 2D z pozycjonowaniem modułów palcem/myszką i liczbowym X/Y.
- Obrót 0/90/180/270 stopni i ustawianie przy czterech ścianach.
- Dodawanie drzwi, okien i przeszkód z wymiarami.
- Schematyczny wspólny widok 3D brył i ścian.
- Kontrola prostokątnych kolizji modułów i granic prostokąta pomieszczenia.
- Orientacyjna kalkulacja płyt, obrzeży, okuć, robocizny i narzutu.
- Eksport rozszerzonego CSV formatek z orientacyjnym obwodem.
- Dane Studio 5.0 w tym samym zestawie .kwd co 4.3, także po ponownym imporcie (z mapowaniem ID modułów).
- Bez zmian w dotychczasowym zapisie lokalnym, bibliotece dekorów, edytorze szafek i eksporcie .kwd.

OGRANICZENIA — WAŻNE
- 3D jest schematem brył, a nie pełnym modelem mebli z frontami, półkami, otworami i okuciami.
- Pomieszczenia L/U są szkicowe; kontrola kolizji dotyczy tylko prostokątnej obwiedni.
- Drzwi/okna są oznaczane na rzucie; nie wycinają otworów w bryłach ścian.
- Wspólny blat i formatki bazują na istniejącym uproszczonym modelu 4.3.
- Obrzeża liczone są szacunkowo po całym obwodzie formatek; nie ma przypisania krawędzi.
- Okucia liczone ryczałtem; nie ma jeszcze bezpiecznych reguł wierceń CNC, doboru Blum ani pełnych szafek narożnych.
- Nie traktuj dokumentacji jako gotowej do rozkroju lub CNC bez kontroli technologicznej.

ZALECANE TESTY
1. Otwórz zestaw z 4.3; sprawdź formatki i dekory.
2. Przesuń moduł w 2D i odśwież stronę; sprawdź pozycję.
3. Przypisz moduł do ściany, obróć, sprawdź kolizje.
4. Dodaj okno/drzwi, sprawdź walidację wymiarów.
5. Otwórz 3D; sprawdź zgodność rozmieszczenia brył.
6. Zmień ceny, sprawdź koszt i eksport CSV.
7. Wyeksportuj .kwd, zaimportuj kopię i sprawdź pozycje i otwory.


WERSJA 5.1 — RĘCZNY PODZIAŁ FRONTÓW
W konstruktorze szafki wybierz tryb ręczny i wpisz oddzielone przecinkami wymiary frontów. Dla pionowego podziału są to szerokości, dla poziomego wysokości. Suma musi być równa dostępnemu wymiarowi po odjęciu szczelin (liczba frontów + 1). Każdy front trafia jako osobna formatka do CSV pojedynczej szafki i zestawu. Projekty bez tych pól zachowują tryb automatyczny. Wymiary i okucia zweryfikuj przed produkcją.

5.2: profile frontow proste / 45 stopni / J, wydluzenie dolne, korytko GOLA aluminium lub formatki (schemat). Produkcyjne wymiary frezowania i mocowania nalezy zweryfikowac.

5.3: zwijane panele (strzalki), rozwin/zwin wszystko, zapamietywanie ukladu na urzadzeniu. Dane projektow pozostaja bez zmian.

5.3.1: naprawa wstawienia skryptu akordeonu wewnatrz szablonu wydruku. Zwijanie tylko panelu ustawien, nie wizualizacji.

5.3.2: NAPRAWA: usunieto niezamierzony znacznik zamkniecia skryptu w szablonie wydruku, ktory zatrzymywal generowanie konstrukcji. Dodano opcjonalny podchwyt z wylacznikiem. Domyslnie wylaczony, takze dla starych projektow. Korytka i podciecia bokow sa nadal schematyczne; nie sa to formatki produkcyjne.

5.4 — Rozbudowa bez zmiany kluczy zapisanych projektów.
- Przegrody pionowe: formatki i prosty model 3D, układ równy.
- Szuflady: orientacyjne zestawienie systemu LEGRABOX lub prowadnic; brak geometrii i wymiarów dna/pleców, brak otworowania i weryfikacji katalogowej.
- GOLA i podchwyty zachowane z 5.3.2 (geometria nadal schematyczna).
- Kalkulator kosztu i narzutu na koszt, orientacyjne obrzeża frontów i półek, CSV formatek.
- Cofnij / ponów zmiany formularza (do 60 kroków; historia w pamięci sesji).
- Kopiowanie zapisanych projektów: zakładka Projekty (funkcja z wcześniejszych wersji).
UWAGA: nie jest to zatwierdzona dokumentacja produkcyjna, zwłaszcza dla szuflad, obrzeży i GOLA.
Nie czyść pamięci Safari; eksportuj kopię projektów przed aktualizacją.

5.5: Sevroll jako domyslny wybor zawiasow i szuflad. Blum i systemy ogolne alternatywnie. AXILO 48, AXILO 78 lub inne nozki. Orientacyjne ilosci zawiasow, nozek i kompletow szuflad oraz ceny jednostkowe. Krawedzie D1 D2 K1 K2 na grupach formatek, eksport CSV okuc, kopiowanie biezacej szafki. Podglad schematycznych nozek w 3D. Nie sa to zatwierdzone parametry techniczne producentow.

5.6: Konstruktor skrzynek szuflad na podstawie ręcznie określonych luzów, schemat 2D i schematyczny podgląd 3D; konfigurator drzwi przesuwnych Sevroll (wzór zakładkowy, nie zweryfikowany katalogowo), rzędowy rozkrój grupowany po dekorze/grubości, nawierty z ręcznym szablonem i CSV. Brak generowania kodu CNC/DXF. Dane 5.6 zapisują się jako ustawienia lokalne przeglądarki, niezależne od projektów 5.5. Wymiary szuflad i skrzydeł Sevroll/Blum są przykładowymi wzorami warsztatowymi; wymagają weryfikacji z dokumentacją konkretnego systemu.

KORDZIKWOOD Studio 5.7 — NOWE
- Zakladka Studio PRO 5.7: przegrody o indywidualnych pozycjach X, dodawane do formatek, rozkroju i modelu 3D. Nie usuwa to automatycznych przegrod z 5.4.
- Biblioteka okuć projektu: Sevroll, Blum, Häfele i inne; recznie wpisywane modele, ilosci i ceny. To nie jest oficjalny katalog producenta; ceny nie sa automatycznie doliczane do kalkulatora 5.5.
- Dokumentacja CSV formatek z orientacyjnym obrzezem wg grup; eksport nawiertow pozostaje w zakladce Konstrukcja PRO 5.6. Nie jest to plik CNC.
- Pakiet projektu 5.7 JSON: szafka + parametry 5.6 + okucia + przegrody 5.7. Import nie nadpisuje automatycznie bazy zlecen.
- Klienci i zlecenia: dane lokalne, statusy, terminy, migawki projektow, eksport i import JSON.
- Zachowane pliki i funkcje 5.6; nie zmieniono klucza starej bazy projektow.
- Przed instalacja eksportuj kopie wszystkich projektow i zlecen. Po instalacji sprawdz nowe funkcje na iPhone Safari.
OGRANICZENIA: Nie jest to gotowy program CNC. Modele okuć nie sa zweryfikowane katalogowo. Dodatkowe przegrody nie uwzgledniaja kolizji z polkami, szufladami i okuciami; trzeba je sprawdzic recznie.
