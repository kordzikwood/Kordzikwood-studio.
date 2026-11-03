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
