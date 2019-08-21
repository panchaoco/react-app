export interface ListData {
  entry: EntryData[],
  attributes: {
    total: number,
    page: number,
    page_size: number
  }
}

export interface EntryData {
  category: {
    attributes: {
      'im:id' : string,
      label: string,
      scheme: string,
      term: string
    }
  },
  id: {
    label: string,
    attributes: {
      'im:id': string,
      'im:bundleId': string
    }
  },
  'im:artist': {
    label: string,
    attributes: {
      href: string,
    }
  },
  'im:contentType': {
    attributes: {
      label: string,
      term: string
    }
  },
  'im:image': {
    attributes: {
      height: string | number
    },
    label: string
  }[],
  'im:name': {
    label: string,
  },
  'im:price': {
    attributes: {
      amount: string,
      currency: string
    },
    label: string
  },
  'im:releaseDate': {
    attributes: {
      label: string
    },
    label: string
  },
  link: {
    attributes: {
      href: string,
      rel: string,
      type: string
    }
  },
  rights: {
    label: string
  },
  summary: {
    label: string
  },
  title: {
    label: string
  }
}
