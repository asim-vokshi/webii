/**
 * Admin-friendly static content file.
 *
 * Edit this file directly in code to update website content. There is no backend,
 * CMS, database, or automatic frontend editing mechanism. Images and videos should
 * live in `client/public/images` and `client/public/videos`, then be referenced
 * with paths like `/images/file.jpeg` or `/videos/file.mp4`.
 */

export interface NewsItem {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl?: string | null;
  publishedAt: string;
  featured?: boolean | null;
}

export interface NewsListParams {
  search?: string;
  category?: string;
  page?: number;
  limit?: number;
}

export interface NewsListResponse {
  items: NewsItem[];
  total: number;
  page: number;
  limit: number;
  categories: string[];
}

export interface StaffMember {
  id: number;
  name: string;
  role: string;
  department: string;
  bio: string;
  email?: string | null;
  yearsExperience?: number | null;
}

export interface StaffListParams {
  search?: string;
  department?: string;
}

export interface StaffListResponse {
  items: StaffMember[];
  departments: string[];
}

export const schoolInfo = {
  name: "Shkolla e Mesme me Orientim Gjuhësor Asim Vokshi",
  shortName: "Asim Vokshi",
  location: "Tiranë, Shqipëri",
  founded: "15 shtator 1965",
  focus: "Arsim gjuhësor, kulturor dhe akademik për nxënësit e arsimit të mesëm.",
};

// =============================================================================
// STATIC DATA
// =============================================================================

export const newsItems: NewsItem[] = [];

export const staffItems: StaffMember[] = [
  // Drejtoria
  { id: 1, name: "Marsida Jarani", role: "Drejtore", department: "Drejtoria", bio: "Drejtore e shkollës me përvojë të gjatë në menaxhim arsimor.", email: "marsida.jarani@shavokshi.edu.al", yearsExperience: 22 },
  { id: 2, name: "Mirela Reqica", role: "Zëvendësdrejtore", department: "Drejtoria", bio: "Zëvendësdrejtore me fokus në cilësinë e mësimdhënies.", email: "mirela.reqica@shavokshi.edu.al", yearsExperience: 18 },
  { id: 3, name: "Rovena Jani", role: "Zëvendësdrejtore", department: "Drejtoria", bio: "Zëvendësdrejtore me përvojë në programe ndërkombëtare.", email: "rovena.jani@shavokshi.edu.al", yearsExperience: 16 },
  // Shërbimi Psikosocial
  { id: 4, name: "Jorida Braushi", role: "Psikologe", department: "Shërbimi Psikosocial", bio: "Psikologe shkollore.", email: "jorida.braushi@shavokshi.edu.al", yearsExperience: 12 },
  { id: 5, name: "Jonila Llabani", role: "Punonjëse sociale", department: "Shërbimi Psikosocial", bio: "Punonjëse sociale.", email: "jonila.llabani@shavokshi.edu.al", yearsExperience: 10 },
  { id: 6, name: "Ajda Leknikaj", role: "Koordinatore e sigurimit të cilësisë", department: "Koordinatore", bio: "Koordinatore e sigurimit të cilësisë.", email: "ajda.leknikaj@shavokshi.edu.al", yearsExperience: 11 },
  { id: 7, name: "Olta Barbullushi", role: "Koordinatore e këshillimit të karrierës", department: "Koordinatore", bio: "Koordinatore e këshillimit të karrierës.", email: "olta.barbullushi@shavokshi.edu.al", yearsExperience: 13 },
  { id: 8, name: "Slementina Musabelliu", role: "Oficere sigurie", department: "Oficere Sigurie", bio: "Oficere sigurie.", email: "slementina.musabelliu@shavokshi.edu.al", yearsExperience: 9 },
  // Administrata
  { id: 9, name: "Greda Stefo", role: "Sekretare", department: "Administrata", bio: "Sekretare administrate.", email: "greda.stefo@shavokshi.edu.al", yearsExperience: 15 },
  { id: 10, name: "Klea Kasa", role: "Sekretare", department: "Administrata", bio: "Sekretare administrate.", email: "klea.kasa@shavokshi.edu.al", yearsExperience: 8 },
  { id: 11, name: "Klodiana Malluta", role: "Sekretare", department: "Administrata", bio: "Sekretare administrate.", email: "klodiana.malluta@shavokshi.edu.al", yearsExperience: 12 },
  // Anglisht
  { id: 12, name: "Irena Zaimaj", role: "Shefe e departamentit", department: "Departamenti i Gjuhës Angleze", bio: "Shefe departamenti.", email: "irena.zaimaj@shavokshi.edu.al", yearsExperience: 20 },
  { id: 13, name: "Aida Zoto", role: "Mësuese", department: "Departamenti i Gjuhës Angleze", bio: "Mësuese e gjuhës angleze.", email: "aida.zoto@shavokshi.edu.al", yearsExperience: 14 },
  { id: 14, name: "Sander Kola", role: "Mësues", department: "Departamenti i Gjuhës Angleze", bio: "Mësues i gjuhës angleze.", email: "sander.kola@shavokshi.edu.al", yearsExperience: 18 },
  { id: 15, name: "Alba Gjini", role: "Mësuese", department: "Departamenti i Gjuhës Angleze", bio: "Mësuese e gjuhës angleze.", email: "alba.gjini@shavokshi.edu.al", yearsExperience: 10 },
  { id: 16, name: "Etleva Zelo", role: "Mësuese", department: "Departamenti i Gjuhës Angleze", bio: "Mësuese e gjuhës angleze.", email: "etleva.zelo@shavokshi.edu.al", yearsExperience: 16 },
  { id: 17, name: "Herald Halluli", role: "Mësues", department: "Departamenti i Gjuhës Angleze", bio: "Mësues i gjuhës angleze.", email: "herald.halluli@shavokshi.edu.al", yearsExperience: 9 },
  { id: 18, name: "Evis Kolani", role: "Mësuese", department: "Departamenti i Gjuhës Angleze", bio: "Mësuese e gjuhës angleze.", email: "evis.kolani@shavokshi.edu.al", yearsExperience: 12 },
  { id: 19, name: "Leonora Elezi", role: "Mësuese", department: "Departamenti i Gjuhës Angleze", bio: "Mësuese e gjuhës angleze.", email: "leonora.elezi@shavokshi.edu.al", yearsExperience: 15 },
  // Gjermanisht & Spanjollisht
  { id: 20, name: "Brunkela Dervishi", role: "Shefe e departamentit", department: "Departamenti i Gjuhës Gjermane & Spanjolle", bio: "Shefe departamenti.", email: "brunkela.dervishi@shavokshi.edu.al", yearsExperience: 19 },
  { id: 21, name: "Valdete Mehmeti", role: "Mësuese", department: "Departamenti i Gjuhës Gjermane & Spanjolle", bio: "Mësuese.", email: "valdete.mehmeti@shavokshi.edu.al", yearsExperience: 17 },
  { id: 22, name: "Grisilda Xhebrahimaj", role: "Mësuese", department: "Departamenti i Gjuhës Gjermane & Spanjolle", bio: "Mësuese.", email: "grisilda.xhebrahimaj@shavokshi.edu.al", yearsExperience: 8 },
  { id: 23, name: "Entela Beshaj", role: "Mësuese", department: "Departamenti i Gjuhës Gjermane & Spanjolle", bio: "Mësuese.", email: "entela.beshaj@shavokshi.edu.al", yearsExperience: 14 },
  { id: 24, name: "Nertila Buçpapaj", role: "Mësuese", department: "Departamenti i Gjuhës Gjermane & Spanjolle", bio: "Mësuese.", email: "nertila.bucpapaj@shavokshi.edu.al", yearsExperience: 11 },
  { id: 25, name: "Danjela Bogdani", role: "Mësuese", department: "Departamenti i Gjuhës Gjermane & Spanjolle", bio: "Mësuese.", email: "danjela.bogdani@shavokshi.edu.al", yearsExperience: 13 },
  // Italisht, Turqisht, Rusisht
  { id: 26, name: "Eva Pustina", role: "Shefe e departamentit", department: "Departamenti i Gjuhës Italiane, Turke dhe Ruse", bio: "Shefe departamenti.", email: "eva.pustina@shavokshi.edu.al", yearsExperience: 21 },
  { id: 27, name: "Eli Lazri", role: "Mësuese", department: "Departamenti i Gjuhës Italiane, Turke dhe Ruse", bio: "Mësuese.", email: "eli.lazri@shavokshi.edu.al", yearsExperience: 16 },
  { id: 28, name: "Anxhela Angjeli", role: "Mësuese", department: "Departamenti i Gjuhës Italiane, Turke dhe Ruse", bio: "Mësuese.", email: "anxhela.angjeli@shavokshi.edu.al", yearsExperience: 12 },
  { id: 29, name: "Enxhi Shabani", role: "Mësuese", department: "Departamenti i Gjuhës Italiane, Turke dhe Ruse", bio: "Mësuese.", email: "enxhi.shabani@shavokshi.edu.al", yearsExperience: 7 },
  { id: 30, name: "Holger Protopapa", role: "Mësues", department: "Departamenti i Gjuhës Italiane, Turke dhe Ruse", bio: "Mësues.", email: "holger.protopapa@shavokshi.edu.al", yearsExperience: 10 },
  { id: 31, name: "Argita Veizi", role: "Mësuese", department: "Departamenti i Gjuhës Italiane, Turke dhe Ruse", bio: "Mësuese.", email: "argita.veizi@shavokshi.edu.al", yearsExperience: 14 },
  // Frengjisht
  { id: 32, name: "Eva Taku", role: "Shefe e departamentit", department: "Departamenti i Gjuhës Frënge", bio: "Shefe departamenti.", email: "eva.taku@shavokshi.edu.al", yearsExperience: 22 },
  { id: 33, name: "Blerta Llakaj", role: "Mësuese", department: "Departamenti i Gjuhës Frënge", bio: "Mësuese.", email: "blerta.llakaj@shavokshi.edu.al", yearsExperience: 15 },
  { id: 34, name: "Brunilda Marku", role: "Mësuese", department: "Departamenti i Gjuhës Frënge", bio: "Mësuese.", email: "brunilda.marku@shavokshi.edu.al", yearsExperience: 18 },
  { id: 35, name: "Vjollca Shurdhi", role: "Mësuese", department: "Departamenti i Gjuhës Frënge", bio: "Mësuese.", email: "vjollca.shurdhi@shavokshi.edu.al", yearsExperience: 20 },
  { id: 36, name: "Sofilda Teta", role: "Mësuese", department: "Departamenti i Gjuhës Frënge", bio: "Mësuese.", email: "sofilda.teta@shavokshi.edu.al", yearsExperience: 12 },
  // Mësues Ndihmës
  { id: 37, name: "Alma Lulja", role: "Mësuese ndihmëse", department: "Mësuesit Ndihmës", bio: "Mësuese ndihmëse.", email: "alma.lulja@shavokshi.edu.al", yearsExperience: 8 },
  { id: 38, name: "Juxhin Bozhiqi", role: "Mësues ndihmës", department: "Mësuesit Ndihmës", bio: "Mësues ndihmës.", email: "juxhin.bozhiqi@shavokshi.edu.al", yearsExperience: 6 },
  { id: 39, name: "Kimete Hidri", role: "Mësuese ndihmëse", department: "Mësuesit Ndihmës", bio: "Mësuese ndihmëse.", email: "kimete.hidri@shavokshi.edu.al", yearsExperience: 11 },
  { id: 40, name: "Sueda Sulmina", role: "Mësuese ndihmëse", department: "Mësuesit Ndihmës", bio: "Mësuese ndihmëse.", email: "sueda.sulmina@shavokshi.edu.al", yearsExperience: 5 },
];

export const newsCategories = Array.from(new Set(newsItems.map((n) => n.category)));
export const staffDepartments = Array.from(new Set(staffItems.map((s) => s.department)));

// =============================================================================
// SELECTORS
// =============================================================================

export function getNewsList(params: NewsListParams = {}): NewsListResponse {
  const { search, category, page = 1, limit = 9 } = params;

  let items = [...newsItems];

  if (category) {
    items = items.filter(
      (n) => n.category.toLowerCase() === category.toLowerCase(),
    );
  }
  if (search) {
    const q = search.toLowerCase();
    items = items.filter(
      (n) =>
        n.title.toLowerCase().includes(q) ||
        n.excerpt.toLowerCase().includes(q),
    );
  }
  items.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  const total = items.length;
  const paginated = items.slice((page - 1) * limit, page * limit);

  return {
    items: paginated,
    total,
    page,
    limit,
    categories: newsCategories,
  };
}

export function getStaffList(params: StaffListParams = {}): StaffListResponse {
  const { search, department } = params;
  let items = [...staffItems];

  if (department) {
    items = items.filter(
      (s) => s.department.toLowerCase() === department.toLowerCase(),
    );
  }
  if (search) {
    const q = search.toLowerCase();
    items = items.filter(
      (s) =>
        s.name.toLowerCase().includes(q) || s.role.toLowerCase().includes(q),
    );
  }
  items.sort((a, b) => a.name.localeCompare(b.name));

  return { items, departments: staffDepartments };
}



export function getNewsById(id: number): NewsItem | undefined {
  return newsItems.find((n) => n.id === id);
}
