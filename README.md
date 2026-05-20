 Conduit Playwright Tests

Automatizovani UI i API testing projekat baziran na:

* Playwright
* TypeScript
* Page Object Model (POM) patternu
* Clean i jednostavnoj strukturi projekta

Testno okruženje:

* [Conduit Demo Application](https://conduit.bondaracademy.com)

---

# Struktura Projekta

```txt
conduit-playwright-tests/
│
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── .env
├── .env.example
├── README.md
│
├── src/
│   ├── config/
│   │   └── env.ts
│   │
│   ├── api/
│   │   ├── api-client.ts
│   │   ├── auth-api.ts
│   │   └── articles-api.ts
│   │
│   ├── pages/
│   │   ├── base.page.ts
│   │   ├── login.page.ts
│   │   ├── register.page.ts
│   │   ├── home.page.ts
│   │   ├── editor.page.ts
│   │   └── article.page.ts
│   │
│   ├── test-data/
│   │   ├── users.ts
│   │   └── articles.ts
│   │
│   └── utils/
│       ├── random.ts
│       └── auth-helper.ts
│
├── tests/
│   ├── api/
│   │   ├── login.api.spec.ts
│   │   ├── register.api.spec.ts
│   │   └── articles.api.spec.ts
│   │
│   ├── ui/
│   │   ├── login.ui.spec.ts
│   │   ├── register.ui.spec.ts
│   │   ├── create-article.ui.spec.ts
│   │   └── delete-article.ui.spec.ts
│   │
│   └── smoke/
│       └── smoke.spec.ts
│
├── reports/
├── test-results/
└── playwright-report/
```

---

# Objašnjenje Foldera

| Folder              | Opis                                        |
| ------------------- | ------------------------------------------- |
| `src/pages`         | UI Page Object klase                        |
| `src/api`           | API request metode                          |
| `src/test-data`     | Statički testni podaci                      |
| `src/utils`         | Pomoćne/helper metode                       |
| `tests/ui`          | UI test scenariji                           |
| `tests/api`         | API test scenariji                          |
| `tests/smoke`       | Osnovni smoke testovi                       |
| `reports`           | Custom reporti                              |
| `playwright-report` | Default Playwright HTML report              |
| `test-results`      | Screenshotovi, trace fajlovi i video snimci |

---

# Tehnologije

| Tehnologija       | Namjena                  |
| ----------------- | ------------------------ |
| Playwright        | UI + API automatizacija  |
| TypeScript        | Razvoj testova           |
| Node.js           | Runtime okruženje        |
| Page Object Model | Lakše održavanje testova |

---

# Podešavanje Projekta

## 1. Kreiranje Projekta

Pokrenuti sljedeće Git Bash komande:

```bash
mkdir conduit-playwright-tests
cd conduit-playwright-tests

mkdir -p src/config
mkdir -p src/api
mkdir -p src/pages
mkdir -p src/test-data
mkdir -p src/utils

mkdir -p tests/api
mkdir -p tests/ui
mkdir -p tests/smoke

mkdir -p reports
mkdir -p test-results
mkdir -p playwright-report

touch package.json
touch playwright.config.ts
touch tsconfig.json
touch .env
touch .env.example
touch README.md

touch src/config/env.ts

touch src/api/api-client.ts
touch src/api/auth-api.ts
touch src/api/articles-api.ts

touch src/pages/base.page.ts
touch src/pages/login.page.ts
touch src/pages/register.page.ts
touch src/pages/home.page.ts
touch src/pages/editor.page.ts
touch src/pages/article.page.ts

touch src/test-data/users.ts
touch src/test-data/articles.ts

touch src/utils/random.ts
touch src/utils/auth-helper.ts

touch tests/api/login.api.spec.ts
touch tests/api/register.api.spec.ts
touch tests/api/articles.api.spec.ts

touch tests/ui/login.ui.spec.ts
touch tests/ui/register.ui.spec.ts
touch tests/ui/create-article.ui.spec.ts
touch tests/ui/delete-article.ui.spec.ts

touch tests/smoke/smoke.spec.ts
```

---

# Instalacija Dependencija

## Inicijalizacija projekta

```bash
npm init -y
```

## Instalacija Playwright-a

```bash
npm install -D @playwright/test
```

## Instalacija browsera

```bash
npx playwright install
```

## Instalacija TypeScript-a

```bash
npm install -D typescript ts-node @types/node
```

## Instalacija dotenv paketa

```bash
npm install -D dotenv
```

---

# Environment Varijable

Primjer `.env` fajla:

```env
BASE_URL=https://conduit.bondaracademy.com
API_URL=https://conduit-api.bondaracademy.com/api

TEST_USER_EMAIL=test@test.com
TEST_USER_PASSWORD=Password123
```

---

# Pokretanje Testova

## Pokretanje svih testova

```bash
npx playwright test
```

## Pokretanje samo UI testova

```bash
npx playwright test tests/ui
```

## Pokretanje samo API testova

```bash
npx playwright test tests/api
```

## Pokretanje smoke testova

```bash
npx playwright test tests/smoke
```

## Pokretanje testova sa otvorenim browserom

```bash
npx playwright test --headed
```

---

# Generisanje HTML Reporta

```bash
npx playwright show-report
```

---

# Najčešći Selektori u Playwright-u

## Preko teksta

```ts
page.getByText('Sign in')
```

## Preko role

```ts
page.getByRole('button', { name: 'Sign in' })
```

## Preko placeholdera

```ts
page.getByPlaceholder('Email')
```

## Preko labela

```ts
page.getByLabel('Email')
```

## Preko CSS selektora

```ts
page.locator('input[placeholder="Email"]')
```

## Preko atributa

```ts
page.locator('[data-testid="login-button"]')
```

## Preko kombinacije CSS + text

```ts
page.locator('button:has-text("Sign in")')
```

## Prvi, zadnji ili nth element

```ts
page.locator('.nav-link').first()
page.locator('.nav-link').last()
page.locator('.nav-link').nth(1)
```

## Element unutar drugog elementa

```ts
page.locator('nav').locator('a:has-text("Sign in")')
```

## XPath (koristiti samo ako je neophodno)

```ts
page.locator('//button[text()="Sign in"]')
```

---

# Preporučeni Redoslijed Korištenja Selektora

```txt
1. getByRole
2. getByPlaceholder
3. getByLabel
4. getByText
5. getByTestId
6. CSS locator
7. XPath
```

---

# Cilj Projekta

Glavni cilj ovog projekta je omogućiti:

* clean strukturu projekta
* jednostavnu arhitekturu za junior/medior QA
* skalabilan automation framework
* odvajanje UI i API testova
* reusable komponente
* lako održavanje automation testova
* jednostavno proširenje projekta u budućnosti
