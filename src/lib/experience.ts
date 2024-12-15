export class Experience {
  public logo: string;
  public company: string;
  public position: string;
  public type: string;
  public startDate: string;
  public endDate: string | null;
  public description: string;
  public skills: string[];
  public isRemote: boolean;

  constructor({
    logo,
    company,
    position,
    type,
    startDate,
    endDate,
    description,
    skills,
    isRemote,
  }: {
    logo: string;
    company: string;
    position: string;
    type: string;
    startDate: string;
    endDate: string | null;
    description: string;
    skills: string[];
    isRemote: boolean;
  }) {
    this.logo = logo;
    this.company = company;
    this.position = position;
    this.type = type;
    this.startDate = startDate;
    this.endDate = endDate;
    this.description = description;
    this.skills = skills;
    this.isRemote = isRemote;
  }
}
