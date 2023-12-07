// Ein- und Ausgaben
#include "stdio.h"

// Nützliche Funktionen für die Arbeit mit Strings
#include "string.h"

// Erkennt den Typ von Zeichenketten
#include "ctype.h"


// Konstanten MAXCODE für maximale Codelänge (10)
//            MAXTEXT für maximale Textlänge (100)
#define MAXCODE 10
#define MAXTEXT 100
#define ENCRYPT 0
#define DECRYPT 1


// Funktionsdeklarationen
void konsoleEinlesen(char *, int);
void codewortEinlesen(char *);
void textEinlesen(char *);
int operationEinlesen(void);
void textVorbereiten(char *, char *);
int zeichenZuCode(char);
char codeZuZeichen(int);
void kodieren(char *, char *, char *, int);


// Einen Text der Länge maximal len von der Konsole einlesen
// und in txt ablegen.
void konsoleEinlesen(char *txt, int len)
{
  // Prinzip:  Speichern, wie viele Zeichen bereits
  // gelesen wurden, jedes Zeichen einzeln einlesen.

  int anzahl = 0;
  char c;
  c = getchar();

  while(anzahl < len && c != '\n')
    {
      txt[anzahl++] = c;
      
      c = getchar();
    }

  txt[anzahl] = '\0';
}


// Codewort von der Konsole einlesen undin txt ablegen.
void codewortEinlesen(char *txt)
{
  printf("Bitte geben Sie ein Codewort <= %d Zeichen ein: ", MAXCODE);
  konsoleEinlesen(txt, MAXCODE);
}


// Klartext bzw. Chiffretext von der Konsole
// einlesen und in txt ablegen.
void textEinlesen(char *txt)
{
  printf("Bitte geben Sie einen Klartext/Chiffretext <= %d Zeichen ein: ", MAXTEXT);
  konsoleEinlesen(txt, MAXTEXT);
}


// Einlesen ob kodiert oder dekodiert werden soll.
// Rückgabewert gibt gewählten Modus an.
int operationEinlesen(void)
{
  char operation;
  
  printf("Bitte wählen Sie die Operation ((c) für Kodieren, (d) für Dekodieren: ");
  scanf("%c", &operation);

  if(operation == 'c')
    return ENCRYPT;
  else if(operation == 'd')
    return DECRYPT;

  printf("Fehlerhafte Eingabe!\n");
  return operationEinlesen(); // FUNKTIONALITÄT PRÜFEN!!!
}


// Bereitet Text zur Verschlüsselung vor, wandelt Kleinbuchstaben
// in Großbuchstaben um, entfernt Sonderzeichen etc.
void textVorbereiten(char *original, char *sauber)
{
  // isalnum: Prüft, ob Eingabe Buchstabe oder Zahl
  // islower: Prüft, ob Eingabe Kleinbuchstabe

  int n = 0;

  for(unsigned int i=0; i < strlen(original); ++i)
    {
      if(isalnum(original[i]))
	{
	  if(islower(original[i]))
	    sauber[n] = original[i] + 'A' - 'a';
	  else
	    sauber[n] = original[i];

	  ++n;
	}
    }

  sauber[n] = '\0';
}


// Wandelt Zeichen in Zahl um.
// 'A' = 0, 'Z' = 25, '0' = 26, '9' = 35
int zeichenZuCode(char c)
{
  if(c >= 'A' && c <= 'Z')
    return c - 'A';
  else if(isdigit(c))
    return 26 + c - '0';
    
  return c; // Darf eigentlich nicht vorkommen
}


// Wandelt eine Zahl in das von ihr repräsentierte
// Zeichen um.
// 0 = 'A', 25 = 'Z', 26 = '0', 35 = '9'
char codeZuZeichen(int i)
{
  if(i >= 0 && i <= 25)
    return 'A' + i;
  else if(i >= 26 && i <= 35)
    return '0' + i - 26;

  return i; // Darf eigentlich nicht vorkommen
}


// Einen Eingabetext kodieren bzw. dekodieren, je nach
// Wert des Parameters operation.
// Kodieren: Eingabe aus text mit codewort verschlüsseln
//           und in ergebnis ablegen.
// Dekodieren: Eingabe aus text mit codewort entschlüsseln
//             und in ergebnis ablegen.
void kodieren(char *codewort, char *text, char *ergebnis, int operation)
{
  int codeLaenge = strlen(codewort);
  char codeText;
  char codeCode;
  char codeErgebnis;
  for(unsigned int i=0; i < strlen(text); i++)
  {
     codeText = zeichenZuCode(text[i]);
     codeCode = zeichenZuCode(codewort[i % codeLaenge]);

     if(operation == ENCRYPT)
     {
       codeErgebnis = (codeCode + codeText) % 36 ;
     }
     else
      {
       codeErgebnis = (codeText - codeCode) % 36 ;
      if(codeErgebnis < 0)
        codeErgebnis += 36;
      }
      ergebnis[i] = codeZuZeichen(codeErgebnis);
  }
  ergebnis[strlen(text)] = '\0';
}


int main(int argc, char *argv[])
{
  char codewort[MAXCODE + 1]; // Schlüssel
  char sauberCodewort[MAXCODE + 1]; // Bereinigter Schlüssel

  char text[MAXTEXT + 1]; // Text
  char sauberText[MAXTEXT + 1]; // Bereinigter Text

  char ergebnis[MAXTEXT + 1]; // Ergebnis

  int operation;
  
  codewortEinlesen(codewort);

  textEinlesen(text);

  operation = operationEinlesen();

  textVorbereiten(codewort, sauberCodewort);
  textVorbereiten(text, sauberText);

  kodieren(sauberCodewort, sauberText, ergebnis, operation);

  printf("Ergebnis:\n");
  printf("Code: %s\n", codewort);
  printf("Text: %s\n", sauberText);
  printf("Code: %s\n", sauberCodewort);
  printf("------------------------------------------\n");
  printf("Ergebnis: %s\n", ergebnis);

  return 0; // Erfolgreich beenden
}
