export interface JWTInformation {
	rawToken: string;
	groups: string[];
	name: string;
	claims: JWTClaims[];
	issuer: string;
	issuedAtTime: number;
	expirationTime: number;
}

interface JWTClaims {
	name: string;
	value: string;
}
